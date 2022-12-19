import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-pixabay',
  templateUrl: './pixabay.component.html',
  styleUrls: ['./pixabay.component.scss']
})
export class PixabayComponent implements OnInit, OnDestroy {

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
    if (value?.toUpperCase() === 'PIXABAY' && value.toUpperCase() !== this.currentTab) {
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



  getImagesCall(reset = false) {

    if (this.totalImages >= this.imageList.length) {
      if (reset) {
        this.pagging.page = 0;
      }

      fetch(`https://pixabay.com/api/?key=${environment.thirdPartyKeys.pixabay}&page=${++this.pagging.page}&per_page=${this.pagging.pageSize}&image_type=photo&q=${this.searchString ? this.searchString : 'random'}`)
        .then(res => res.json())
        .then(
          result => {
            this.totalImages = result.total;
            const images = result.hits.map(value => ({
              thumb: value.previewURL,
              url: value.webformatURL,
              filename: value.user,
              descr: value.tags,
              navigate: value.pageURL, provider: 'PIXABAY', provider_url: 'https://pixabay.com'
            }));
            this.loading = false;
            this.lastPayload.page = this.lastPayload.page;
            if (reset) {
              this.imageList = [...images]
              return
            }
            this.imageList = [...this.imageList, ...images]
          }
        ).catch(e => this.loading = false);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub?.unsubscribe())
  }
}
