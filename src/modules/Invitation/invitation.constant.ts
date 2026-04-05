export const INVITATION_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  BANNED: 'BANNED',
} as const;

export const INVITATION_MESSAGES = {
  CREATED: 'Invitation created successfully',
  UPDATED: 'Invitation updated successfully',
  DELETED: 'Invitation deleted successfully',
  NOT_FOUND: 'Invitation not found!',
};