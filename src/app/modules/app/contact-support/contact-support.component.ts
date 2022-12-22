import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent implements OnInit {
  @HostBinding('class') class = 'flex-fill';
  constructor() { }

  ngOnInit(): void {
  }

}
