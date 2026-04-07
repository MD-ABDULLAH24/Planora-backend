import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import {
  TPaymentIntent,
  TIPaymentResult,
  TPaymentConfirmation,
} from "./payment.interface";
import { PaymentStatus } from "../../../generated/prisma/enums";

// Stripe instance
const stripe = new (Stripe as any)(config.stripe_secret_key as string, {
  apiVersion: "2023-10-16",
});

const createPaymentIntent = async (
  payload: TPaymentIntent,
): Promise<TIPaymentResult> => {
  const { participantId } = payload;

  const participant = await prisma.participant.findUnique({
    where: { id: participantId },
    include: {
      event: true,
      user: true,
    },
  });

  if (!participant) {
    throw new AppError(httpStatus.NOT_FOUND, "Participant not found");
  }

  if (participant.paymentStatus === "PAID") {
    throw new AppError(httpStatus.BAD_REQUEST, "Already paid");
  }

  const amount = participant.event.fee;
  const amountInCents = Math.round(amount * 100);

  // Stripe PaymentIntent creation
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    metadata: {
      participantId: participant.id,
      userId: participant.userId,
    },
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never", // Postman-friendly, avoids return_url issue
    },
  });

  return {
    clientSecret: paymentIntent.client_secret as string,
    amount,
    transactionId: paymentIntent.id,
  };
};

const savePaymentRecord = async (payload: TPaymentConfirmation) => {
  return await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        participantId: payload.participantId,
        transactionId: payload.transactionId,
        amount: payload.amount,
        status: PaymentStatus.PAID,
        
      },
    });

    if (payload.status === PaymentStatus.PAID) {
      await tx.participant.update({
        where: { id: payload.participantId },
        data: { paymentStatus: "PAID" }, // mark as paid
      });
    }

    return payment;
  });
};

const confirmPayment = async (participantId: string, transactionId: string) => {
  let paymentIntent = await stripe.paymentIntents.retrieve(transactionId);

  if (paymentIntent.status === "requires_payment_method") {
    // Test card for Postman
    paymentIntent = await stripe.paymentIntents.confirm(transactionId, {
      payment_method: "pm_card_visa",
    });
  }

  if (paymentIntent.status === "succeeded") {
    const amount = paymentIntent.amount / 100;

    const existingPayment = await prisma.payment.findUnique({
      where: { transactionId },
    });

    if (existingPayment) {
      return existingPayment;
    }

    return await savePaymentRecord({
      participantId,
      transactionId,
      amount,
      status: "succeeded",
      gatewayData: paymentIntent as unknown as Record<string, any>,
    });
  } else {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Payment status is ${paymentIntent.status}`,
    );
  }
};

export const PaymentService = {
  createPaymentIntent,
  confirmPayment,
};
