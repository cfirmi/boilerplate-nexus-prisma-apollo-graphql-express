import { enumType } from '@nexus/schema';

export enum ErrorCode {
  EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  RESOURCE_ID_NOT_FOUND = 'RESOURCE_ID_NOT_FOUND',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  UNKNOWN = 'UNKNOWN',
}

export const SubscriptionTrigger = Object.freeze({
  TODO_EVENT: `TODO_EVENT`,
  USER_EVENT: `USER_EVENT`,
});

export enum MutationType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export const MutationEnumType = enumType({
  name: 'MutationType',
  members: MutationType,
});
