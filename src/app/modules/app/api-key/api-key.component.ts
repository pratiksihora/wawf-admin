import { Component, HostBinding, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/base/toastr/toast-service/toast.service';
import { ToastrUtil } from 'src/app/shared/_core/utils/toastr';
import { TokenUtil } from 'src/app/shared/_core/utils/token';

@Component({
  selector: 'app-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.scss']
})
export class ApiKeyComponent implements OnInit {
  @HostBinding('class') class = 'flex-fill';
  constructor(public toast: ToastService) { }

  loading: any = false;
  userData: any;

  webhookJson = {
    "status": 200,
    "message": "OK",
    "sk_id": 231,
    "sk_fk_plan_id": null,
    "sk_licence_key": "951cfdc1-b319-40d3-a5cf-0047aeb3be29",
    "sk_start_date": null,
    "sk_end_date": null,
    "sk_customer_id": null,
    "sk_no_of_login": 1,
    "sk_type": "fixed",
    "sk_status": "un-used",
    "sk_email": null,
    "sk_plan_name": null,
    "sk_config": null,
    "sk_created_at": "2023-03-29T13:37:19.920Z",
    "sk_modified_at": "2023-03-29T13:37:19.920Z",
    "sk_archive": false,
    "sk_plan_type": "Premium",
    "sk_fk_reseller_unique": "TJHVW2UJ",
    "sk_no_of_month": 1,
    "sk_renew_count": 0,
    "sk_name": "Test",
    "sk_mobile_no": "123",
    "sk_email_manual": "testemail@yopmail.com",
    "sk_reseller_ext_url": "https://api.moretus.click/wawf/1.0.0/ext.zip",
    "sk_reseller_email": "support@wawf.com"
  }
  webhookResponseJson = {
    "status": 200,
    "message": "OK",
    "sk_id": 231,
    "sk_fk_plan_id": null,
    "sk_licence_key": "951cfdc1-b319-40d3-a5cf-0047aeb3be29",
    "sk_start_date": null,
    "sk_end_date": null,
    "sk_customer_id": null,
    "sk_no_of_login": 1,
    "sk_type": "fixed",
    "sk_status": "un-used",
    "sk_email": null,
    "sk_plan_name": null,
    "sk_config": null,
    "sk_created_at": "2023-03-29T13:37:19.920Z",
    "sk_modified_at": "2023-03-29T13:37:19.920Z",
    "sk_archive": false,
    "sk_plan_type": "Premium",
    "sk_fk_reseller_unique": "TJHVW2UJ",
    "sk_no_of_month": 1,
    "sk_renew_count": 0,
    "sk_name": "Test",
    "sk_mobile_no": "123",
    "sk_email_manual": "testemail@yopmail.com",
    "sk_reseller_ext_url": "https://api.moretus.click/wawf/1.0.0/ext.zip",
    "sk_reseller_email": "support@wawf.com"
  }

  ngOnInit(): void {
    this.userData = TokenUtil.getUser();
  }


  tabs: any = [
    'Webhook Details',
    'Examples',
  ];

  activeTab = this.tabs[0];


  changeTabs = (tabIndex: number) => {
    this.activeTab = this.tabs[tabIndex]
  }

  ViewButton() {

  }

  changeApiKey(){

  }

  copyKey() {
    navigator.clipboard.writeText(this.userData?.reseller_api_key);
    this.toast.show(ToastrUtil.configureSuccess({ type: 'success', title: 'API key', message: 'API key has been copied successfully.' }))
    close()
  }
  copyUrl() {
    navigator.clipboard.writeText("https://api.moretus.click/api/v1/key/generate");
    this.toast.show(ToastrUtil.configureSuccess({ type: 'success', title: 'Webhook URL', message: 'Webhook URL has been copied successfully.' }))
    close()
  }

}
