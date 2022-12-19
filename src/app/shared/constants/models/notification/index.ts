import { NotificationType } from "../../enums/common/notification/notification-type.enum";

/**
 * Notification config
 */
export interface NotificationConfig {
  type?: NotificationType,
  errorType?: NotificationType,
  title?: string;
  error?: string;
  success?: string;
}
