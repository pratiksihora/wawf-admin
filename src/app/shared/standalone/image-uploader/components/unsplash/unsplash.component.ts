import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { createApi } from 'unsplash-js';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-unsplash',
  templateUrl: './unsplash.component.html',
  styleUrls: ['./unsplash.component.scss']
})
export class UnsplashComponent implements OnInit, OnDestroy {

  //User define variables 
  searchString;
  imageList = [];
  subscriptions: Subscription[] = []
  totalImages = 0;
  _currentTab;
  loading = false;
  unsplaceClient;

  pagging = {
    page: 0,
    pageSize: 25
  };
  lastPayload = this.pagging;

  //Input-Output props
  @Input() set currentTab(value) {
    if (value?.toUpperCase() === 'UNSPLASH' && value.toUpperCase() !== this.currentTab) {
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
    this.unsplaceClient = createApi({ accessKey: environment.thirdPartyKeys.unsplash });
  }



  getImagesCall(reset = false) {
    if (this.imageList.length <= this.totalImages) {
      this.loading = true;
      if (reset) {
        this.pagging.page = 0;
      }
      this.unsplaceClient.search.getPhotos({ query: this.searchString ? this.searchString : 'search/photos', page: ++this.pagging.page, perPage: this.pagging.pageSize }).then(result => {
        this.totalImages = result.response.total;
        this.loading = false;
        const images = (result.response.results).map(value => ({
          thumb: value.urls.thumb,
          url: value.urls.regular,
          filename: value.user.name,
          navigate: `https://unsplash.com/photos/${value.id}`,
          provider: 'UNSPLASH', provider_url: 'https://unsplash.com'
        }));
        this.lastPayload.page = this.lastPayload.page;
        if (reset) {
          this.imageList = [...images]
          return;
        }
        this.imageList = [...this.imageList, ...images]
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub?.unsubscribe())
  }

}
