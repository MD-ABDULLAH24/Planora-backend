import { PARTICIPANT_STATUS, PAYMENT_STATUS } from './participant.constant';

export const getDefaultStatus = () => PARTICIPANT_STATUS.PENDING;
export const getDefaultPaymentStatus = () => PAYMENT_STATUS.PENDING;