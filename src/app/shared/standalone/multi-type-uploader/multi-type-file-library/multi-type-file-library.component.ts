import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiModule } from '../../../../../../api/enums/api-module.enum';
import { ApiAction } from '../../../../../../constants/models/api';
import { FILE_API_URL } from '../../../../../../constants/static-constants/api/common/file';
import { TableService } from '../../../../../../api/services/common/table/table.service';
import { ApiUtil } from '../../../../../../_core/utils/api';

@Component({
  selector: 'app-multi-type-file-library',
  templateUrl: './multi-type-file-library.component.html',
  styleUrls: ['./multi-type-file-library.component.scss']
})
export class MultiTypeFileLibraryComponent implements OnInit {

  @Input() config;

  //User define variables 
  searchString;
  fileList = [];
  subscriptions: Subscription[] = []
  totalFiles = 0;
  _currentTab;
  loading = false;
  lastPayload;

  //Input-Output props
  @Input() set currentTab(value) {
    if (value?.toUpperCase() === 'AUDIO_LIBRARY' && value.toUpperCase() !== this.currentTab) {
      this._currentTab = value;
      this.getFileCall(true);
    }
  }

  get currentTab() {
    return this._currentTab;
  }

  @Output() fileClick = new EventEmitter();

  constructor(
    public cdr: ChangeDetectorRef,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    this.lastPayload = {
      pageNumber: 1,
      pageSize: 25,
      filters: [
        {
          field: this.config.categoryKey,
          value: this.config.category,
          operator: 'eq'
        },
        {
          field: this.config.typeKey,
          value: this.config.type,
          operator: 'eq'
        },
        {
          field: this.config.filterKey,
          type: 'string',
          value: '',
          operator: 'in'
        }
      ]
    };
  }

  setPaggingPayload() {

  }

  getFileCall(reset = false) {
    setTimeout(() => {

      if (this.fileList.length <= this.totalFiles) {
        this.loading = true;
        if (reset) {
          this.lastPayload.pageNumber = 1;
        } else {
          ++this.lastPayload.pageNumber;
        }

        const index = this.lastPayload.filters.findIndex(filter => filter.field === this.config.filterKey);
        if (index > -1) {
          this.lastPayload.filters[index].value = this.searchString ? this.searchString : ''
        }
        // this.pagging.filters[1].value = this.searchString ? this.searchString : ""

        const common: ApiAction = ApiUtil.configurePost({ module: ApiModule.MASTER, url: FILE_API_URL.GET_AUDIOS, title: 'File' })
        this.tableService.tableCommon(common, this.lastPayload).subscribe({
          next: (res) => {
            this.loading = false;
            if (res.succeeded) {
              this.totalFiles = res.totalCount;
              // this.planValue = res.data;

              const mappedData = res.data.map(data => {
                return {
                  filename: data[this.config.fileNameKey],
                  url: data[this.config.urlKey],
                  type: data[this.config.contentTypeKey] //new to change according to API key
                  // provider_url: data.mf_filepath
                }
              });
              this.fileList = reset ? mappedData : [...this.fileList, ...mappedData];
              this.cdr.detectChanges();
            }
          }
        });
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub?.unsubscribe())
  }
}
