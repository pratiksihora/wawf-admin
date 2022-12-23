import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  @HostBinding('class') class = 'flex-fill';

  constructor() { }

  ngOnInit(): void {
  }

}
