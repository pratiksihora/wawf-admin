import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { createClient } from 'pexels';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-pexels',
  templateUrl: './pexels.component.html',
  styleUrls: ['./pexels.component.scss']
})
export class PexelsComponent implements OnInit, OnDestroy {

  //User define variables 
  searchString;
  imageList = [];
  subscriptions: Subscription[] = []
  totalImages = 0;
  _currentTab;
  loading = false;
  pexelsClient;

  pagging = {
    page: 0,
    pageSize: 25
  };
  lastPayload = this.pagging;

  //Input-Output props
  @Input() set currentTab(value) {
    if (value?.toUpperCase() === 'PEXELS' && value.toUpperCase() !== this.currentTab) {
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
    this.pexelsClient = createClient(environment.thirdPartyKeys.pexels);
    // this.getImagesCall(true);
  }



  getImagesCall(reset = false) {
    if (this.imageList.length <= this.totalImages) {
      this.loading = true;
      if (reset) {
        this.pagging.page = 0;
      }
      this.pexelsClient.photos.search({ query: this.searchString ? this.searchString : 'trending', per_page: this.pagging.pageSize, page: ++this.pagging.page }).then(data => {
        this.totalImages = data.total_results;
        this.loading = false;
        const images = data.photos.map(value => {
          return {
            thumb: value.src.tiny,
            url: value.src.original,
            filename: value.photographer,
            descr: value.alt,
            navigate: value.url, provider: 'PEXELS', provider_url: 'https://pexels.com'
          }
        });

        this.lastPayload.page = this.lastPayload.page;
        if (reset) {
          this.imageList = [...images]
          return;
        }
        this.imageList = [...this.imageList, ...images]
      }).catch(e => {
        this.loading = false;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub?.unsubscribe())
  }
}
