/**
 * Default Constant enum for default features
 */
export enum PlanStatus {
  ACTIVE = "Active",
  TRIAL = "Trial",
  TRIAL_EXPIRED = "Trial Expired",
  PAYMENT_FAILED = 'Payment Failed',
  CANCELLED = 'Cancelled',
  CANCELLED_UNTIL = 'Active',
  REFUNDED = 'Refunded',
  PARTIAL_REFUND = 'Partial refund',
  DISPUTED = 'Disputed'
}