// Enums
import { PlanStatus } from "src/app/constants/enums/billing/plan-status.enum";

// Constants
import { environment } from "src/environments/environment";

// utils
import { UTCDateUtil } from "../date/utc";

export class PaymentUtil {
  //#region Configure All Tables
  /**
    * Configure Table
    */
  static setup(data: any) {
    let current = UTCDateUtil.current();

    let billing = data.billing;
    let business = data.business;

    let response: any;

    // trial portion
    if (billing.bl_status == PlanStatus.TRIAL) {
      let expired = UTCDateUtil.dateToUTC(billing.bl_end_date).endOf('day').isBefore(current.startOf('day'));
      if (expired) {
        response = { purchase: true, status: PlanStatus.TRIAL_EXPIRED, trial: true, bl_display_status: billing.bl_display_status };
      } else {
        const days = UTCDateUtil.dateToUTC(billing.bl_end_date).endOf('day').diff(current.startOf('day'), 'days');
        response = { purchase: true, active: true, status: PlanStatus.TRIAL, trial: true, bl_display_status: billing.bl_display_status, remaining: days };
      }
    }

    // if payment failed
    if (billing.bl_status == PlanStatus.PAYMENT_FAILED) {
      response = { subscription: true, active: true, failed: true, status: PlanStatus.PAYMENT_FAILED, bl_display_status: billing.bl_display_status };
    }

    // if cancelled
    if (billing.bl_status == PlanStatus.CANCELLED) {
      let active = UTCDateUtil.dateToUTC(billing.bl_end_date).endOf('day').isSameOrAfter(current.startOf('day'));
      if (active) {
        response = { subscription: true, active: true, status: PlanStatus.CANCELLED_UNTIL, active_until: billing.bl_end_date, plan_status: billing.bl_display_status };
      } else {
        response = { purchase: true, status: PlanStatus.CANCELLED, bl_cancelled_at: billing.bl_cancelled_at, plan_status: billing.bl_display_status };
      }
    }

    if (billing.bl_status == PlanStatus.REFUNDED || billing.bl_status == PlanStatus.PARTIAL_REFUND || billing.bl_status == PlanStatus.DISPUTED) {
      response = { purchase: true, active: false, status: billing.bl_status, plan_status: billing.bl_display_status };
    }

    if (!response) {
      response = { subscription: true, active: true, status: billing.bl_status, plan_status: billing.bl_display_status };
    }

    response.billing = response.purchase ? `${environment.apps.billing_fe}/${business.bs_id}/plan` : `${environment.apps.billing_fe}/${business.bs_id}/subscription`;
    response.open = response.active ? `${environment.apps.business_fe}/${business.bs_id}/configure` : response.billing;
    response.setting = response.active ? `${environment.apps.business_fe}/${business.bs_id}/account` : response.billing;
    response.block = response.active ? `${environment.apps.business_fe}/${business.bs_id}/configure` : 'javascript:void(0)'
    return response;
  }
}