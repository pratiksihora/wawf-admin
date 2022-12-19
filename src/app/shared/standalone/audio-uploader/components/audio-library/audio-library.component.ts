import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiModule } from '../../../../../api/enums/api-module.enum';
import { TableService } from '../../../../../api/services/common/table/table.service';
import { ApiAction } from '../../../../../constants/models/api';
import { FILE_API_URL } from '../../../../../constants/static-constants/api/common/file';
import { ApiUtil } from '../../../../../_core/utils/api';

@Component({
  selector: 'app-audio-library',
  templateUrl: './audio-library.component.html',
  styleUrls: ['./audio-library.component.scss']
})
export class AudioLibraryComponent implements OnInit {

  //User define variables 
  searchString;
  audioList = [];
  subscriptions: Subscription[] = []
  totalAudios = 0;
  _currentTab;
  loading = false;
  
  lastPayload = {
    pageNumber: 1,
    pageSize: 25,
    filters: [
      {
        field: 'mf_type',
        value: 'Audio',
        operator: 'eq'
      },
      {
        field: 'mf_name',
        type: 'string',
        value: '',
        operator: 'in'
      }
    ]
  };;

  //Input-Output props
  @Input() set currentTab(value) {
    if (value?.toUpperCase() === 'AUDIO_LIBRARY' && value.toUpperCase() !== this.currentTab) {
      this._currentTab = value;
      this.searchString = '';
      this.getAudioCall(true);
    }
    else {
      this.audioList = [];
    }
  }

  get currentTab() {
    return this._currentTab;
  }

  @Output() audioClick = new EventEmitter();

  constructor(
    public cdr: ChangeDetectorRef,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
  }

  setPaggingPayload() {

  }

  getAudioCall(reset = false) {
    if (this.audioList.length <= this.totalAudios) {
      this.loading = true;
      if (reset) {
        this.lastPayload.pageNumber = 1;
      } else {
        ++this.lastPayload.pageNumber;
      }

      const index = this.lastPayload.filters.findIndex(filter => filter.field === 'mf_name');
      if (index > -1) {
        this.lastPayload.filters[index].value = this.searchString ? this.searchString : ''
      }
      // this.pagging.filters[1].value = this.searchString ? this.searchString : ""

      const common: ApiAction = ApiUtil.configurePost({ module: ApiModule.MASTER, url: FILE_API_URL.GET_AUDIOS, title: 'File' })
      this.tableService.tableCommon(common, this.lastPayload).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.succeeded) {
            this.totalAudios = res.totalCount;
            // this.planValue = res.data;

            const mappedData = res.data.map(data => {
              return {
                filename: data.mf_name,
                url: (this.bucketAwsUrl + data.mf_filepath)
              }
            });

            this.audioList = reset ? mappedData : [...this.audioList, ...mappedData];

            this.cdr.detectChanges();
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub?.unsubscribe())
  }
}
