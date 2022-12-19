import { Component, HostBinding, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-no-result-found',
  templateUrl: './no-result-found.component.html',
  styleUrls: ['./no-result-found.component.scss']
})
export class NoResultFoundComponent implements OnInit {
  @HostBinding('class') class = 'text-center mt-0 d-flex gap-3 flex-column justify-content-center flex-fill';
  defaultImage = environment.defaultImgUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
