import { INVITATION_STATUS } from './invitation.constant';

/**
 * Check if a given status is a valid invitation status
 */
export const isValidStatus = (status: string): boolean => {
  return Object.values(INVITATION_STATUS).includes(status as any);
};

/**
 * Format invitation response for API
 */
export const formatInvitationResponse = (invitation: any) => {
  return {
    id: invitation.id,
    userId: invitation.userId,
    eventId: invitation.eventId,
    status: invitation.status,
    createdAt: invitation.createdAt,
  };
};