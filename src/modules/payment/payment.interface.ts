// src/modules/Payment/payment.interface.ts

export type TIPaymentResult = {
    clientSecret: string;
    amount: number;
    transactionId?: string;
};

export type TPaymentIntent = {
    participantId: string;
};

export type TPaymentConfirmation = {
    transactionId: string;
    participantId: string;
    amount: number;
    status: string;
    gatewayData?: any;
};