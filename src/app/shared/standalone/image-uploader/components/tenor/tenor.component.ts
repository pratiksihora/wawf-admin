import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-tenor',
  templateUrl: './tenor.component.html',
  styleUrls: ['./tenor.component.scss']
})
export class TenorComponent implements OnInit, OnDestroy {

  //User define variables 
  searchString;
  imageList = [];
  subscriptions: Subscription[] = []
  totalImages = 0;
  _currentTab;
  loading = false;
  moreTenorImagesAvailable = 1;

  pagging = {
    page: 0,
    pageSize: 25
  };
  lastPayload = this.pagging;

  //Input-Output props
  @Input() set currentTab(value) {
    if (value?.toUpperCase() === 'TENOR' && value.toUpperCase() !== this.currentTab) {
      this._currentTab = value;
      this.getImagesCall(true);
    }
  }

  get currentTab() {
    return this._currentTab;
  }

  @Output() imageClicked = new EventEmitter();

  constructor(
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }



  async getImagesCall(reset = false) {

    // this.imageList.tenor = [];
    if (this.moreTenorImagesAvailable > 0) {

      this.loading = true;
      if (reset) {
        this.pagging.page = 0;
      }

      await fetch((`https://g.tenor.com/v1/search?limit=${this.pagging.pageSize}&q=${this.searchString ? this.searchString : 'trending'}&contentFilter=high&key=${environment.thirdPartyKeys.tenor}` + (this.moreTenorImagesAvailable ? `&pos=${this.moreTenorImagesAvailable}` : '')))
        .then(res => res.json())
        .then(
          result => {
            this.moreTenorImagesAvailable = result.next;
            const data = result.results.map(value => ({
              thumb: value.media[0]?.tinygif.url,
              url: value.media[0]?.gif.url,
              filename: undefined,
              descr: value.content_description,
              navigate: value.bitly_url, provider: 'TENOR', provider_url: 'https://tenor.com'
            }));
            if (reset) {
              this.imageList = [...data];
            } else {
              this.imageList = [...this.imageList, ...data];
            }

            this.cdr.detectChanges();
            this.lastPayload.page = ++this.lastPayload.page;
            this.loading = false;
          }
        ).catch(e => this.loading = false);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub?.unsubscribe())
  }
}