import { Component, OnInit, HostBinding } from '@angular/core';
import { TokenUtil } from 'src/app/shared/_core/utils/token';

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent implements OnInit {
  @HostBinding('class') class = 'flex-fill';
  constructor() { }
  tabList = ['Report Bug', 'Request feature', 'Request Credit']
  activeTab = this.tabList[0];
  userData: any;
  formurls = {
    bug: '',
    feature: '',
    credit: ''
  }
  ngOnInit(): void {
    this.userData = TokenUtil.getUser();
    this.formurls = {
      bug: `https://my.nativeforms.com/gaJhVUE1jZm4UW4Q2U11Db?name=${this.userData?.reseller_full_name}&email=${this.userData?.reseller_email}`,
      feature: `https://my.nativeforms.com/RFkZ00jZm4UW4Q2U11Db?name=${this.userData?.reseller_full_name}&email=${this.userData?.reseller_email}`,
      credit: `https://my.nativeforms.com/TtGep1jZm4UW4Q2U11Db?name=${this.userData?.reseller_full_name}&email=${this.userData?.reseller_email}`
    }
  }

  changeTab = (tab) => {
    this.activeTab = tab;
  }


}
