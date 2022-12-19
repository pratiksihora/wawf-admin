import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss']
})
export class GiphyComponent implements OnInit, OnDestroy {

  //User define variables 
  searchString;
  imageList = [];
  subscriptions: Subscription[] = []
  totalImages = 0;
  _currentTab; 
  loading = false;

  pagging = {
    page: 0,
    pageSize: 25
  };
  lastPayload = this.pagging;

  //Input-Output props
  @Input() set currentTab(value) {
    if (value?.toUpperCase() === 'GIPHY' && value.toUpperCase() !== this.currentTab) {
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
    // this.getImagesCall(true);
  }



  getImagesCall(reset = false) {

    // this.imageList.giphy = [];
    if (this.totalImages >= this.imageList.length) {
      this.loading = true;
      if (reset) {
        this.pagging.page = 0;
      }
      fetch(`https://api.giphy.com/v1/gifs/${this.searchString ? 'search' : 'trending'}?limit=${this.pagging.pageSize}&q=${this.searchString ? this.searchString : ''}&api_key=${environment.thirdPartyKeys.giphy}&offset=${(this.pagging.page * this.pagging.pageSize * (reset ? 0 : 1))}`)
        .then(res => res.json())
        .then(
          result => {
            this.totalImages = result.pagination.total_count;
            const data = result.data.map(value => ({
              thumb: value.images.preview_gif.url,
              url: value.images.original.webp || value.images.original.url, filename: value.username,
              navigate: value.bitly_url, provider: 'GIPHY', provider_url: 'https://giphy.com'
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
