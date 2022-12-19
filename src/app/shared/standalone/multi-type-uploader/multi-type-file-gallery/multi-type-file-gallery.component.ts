import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

//constants
import { GALLERY_API } from 'src/app/api/constants/gallery/gallery-api';
import { GALLERY_FOLDER_API } from 'src/app/api/constants/gallery/gallery-folders-api';
import { ApiAction } from 'src/app/constants/models/api';

//enum & interface
import { ApiModule } from 'src/app/api/enums/api-module.enum';
import { FILTER_PAYLOAD, PAGGING_PAYLOAD } from '../../image-uploader/image-uploader.constant';

//service
import { GalleryFolderService } from 'src/app/api/services/gallery/gallery-folder.service';

//utils
import { ApiUtil } from 'src/app/_core/utils/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-multi-type-file-gallery',
  templateUrl: './multi-type-file-gallery.component.html',
  styleUrls: ['./multi-type-file-gallery.component.scss']
})
export class MultiTypeFileGalleryComponent implements OnInit {

  folderList = [];
  filteredFolderList = [];
  sort;
  _currentTab;
  isFolder: boolean = true;
  isFile: boolean = false;
  searchString;
  subscriptions: Subscription[] = [];
  lastPayload = PAGGING_PAYLOAD;
  filterPayload = FILTER_PAYLOAD;;
  folderImages = [];
  loading = false;
  totalImageCount = 0;
  selectedFolder;
  
  

  //Input-Output props
  @Input() set currentTab(value) {
    if (value?.toUpperCase() === 'GALLARY' && value.toUpperCase() !== this.currentTab) {
      this._currentTab = value;
      this.folderImages = [];
      this.resetImageList();
      this.galleryApiCall();
    }
  }

  get currentTab() {
    return this._currentTab;
  }

  @Output() imageClicked = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef,
    private folderService: GalleryFolderService
  ) { }

  ngOnInit(): void {
  }

  filterChange(event) {
    this.resetImageList();
    this.filterPayload.value = event.target.value;
    if (this.isFile) {
      this.galleryFolderImagesApiCall();
      return;
    }
    this.filteredFolderList = this.folderList.filter(folder => folder.gf_name.includes(event?.target?.value));
    this.cdr.detectChanges();
  }

  resetImageList() {
    this.resetPagging();
    this.folderImages = [];
    this.cdr.detectChanges();
  }

  resetPagging() {
    this.lastPayload = { ...PAGGING_PAYLOAD };
    this.filterPayload = { ...FILTER_PAYLOAD };
  }

  //#region Gallery Folder
  galleryFolderImagesApiCall(type = null) {
    this.totalImageCount = 0;
    this.folderImages = [];
    if (this.totalImageCount >= this.folderImages.length) {
      this.loading = true;
      // make third party request

      const common: ApiAction = ApiUtil.configurePost({ module: ApiModule.WORKSPACE, url: GALLERY_API.PAGGING, title: 'Gallery' });
      const payload = this.makePaggingPayload(this.lastPayload);
      this.subscriptions.push(this.folderService.galleryFolderCommon(common, { ...payload, gf_id: this.selectedFolder.gf_id }).subscribe(res => {
        this.loading = false;

        if (res.succeeded) {
          if (type) {
            this.folderImages = res.data
          } else {
            this.folderImages = [...this.folderImages, ...res.data];
          }
          this.totalImageCount = res.totalCount;
          // this.defaultFolder = res.data.find(fl => fl.gf_default);
        }
        this.cdr.detectChanges();
      }));
    }
  }

  gotoFile(folder) {
    this.isFolder = false;
    this.isFile = true;
    this.selectedFolder = folder;
    this.searchString = '';
    this.galleryFolderImagesApiCall();
  }

  gotoFolder() {
    this.isFolder = true;
    this.isFile = false;
    this.searchString = '';
    this.resetPagging();
    this.galleryApiCall();
    this.resetImageList();
  }

  //Handle pagging payload
  makePaggingPayload(payload) {
    this.lastPayload = payload;
    const preparedPayload = {
      pageNumber: ++payload.pageNumber,
      pageSize: 10,
      filters: [this.filterPayload]
    }

    return preparedPayload;
  }

  galleryApiCall() {
    this.loading = true;
    this.folderList = [];
    // make third party request

    const common: ApiAction = ApiUtil.configureGet({ module: ApiModule.WORKSPACE, url: GALLERY_FOLDER_API.GET_ALL, title: 'Gallery' })
    this.subscriptions.push(this.folderService.galleryFolderCommon(common).subscribe(res => {
      this.loading = false;

      if (res.succeeded) {
        this.folderList = res.data;
        this.filteredFolderList = res.data;
      }
      this.cdr.detectChanges();
    }));
  }

}
