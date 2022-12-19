// ANGULAR
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Services
import { WorkspaceService } from 'src/app/api/services/workspace/workspace.service';

// Enums and Interfaces
import { ApiModule } from 'src/app/api/enums/api-module.enum';
import { ApiAction } from 'src/app/constants/models/api';

// Constants

// Utils
import { ApiUtil } from 'src/app/_core/utils/api';
import { WORKSPACE_API } from 'src/app/api/constants/workspace/workspace-api';

//pipe
import { FilterPipe } from 'src/app/_core/pipes/filter-pipe/filter.pipe';


@Component({
  selector: 'app-workspace-selector',
  templateUrl: './workspace-selector.component.html',
  styleUrls: ['./workspace-selector.component.scss']
})
export class WorkspaceSelectorComponent implements OnInit {
  @Input() selected: any;

  @Output() saveEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();

  loading: boolean = false;
  filterText: string = '';
  workspaceList: any = [];
  wsFilterList: any = [];
  constructor(public modal: NgbActiveModal, public wsService: WorkspaceService, public filterPipe: FilterPipe) { }

  ngOnInit(): void {
    this.getWorkspaceList()
  }

  // get all workspace list
  getWorkspaceList() {
    this.loading = true;
    const common: ApiAction = ApiUtil.configureGet({ module: ApiModule.WORKSPACE, url: WORKSPACE_API.ALL, title: 'Workspace' })
    this.wsService.workspaceCommon(common).subscribe({
      next: (res) => {
        if (res.succeeded) {
          res.data = res.data.map(item => ({
            ...item, selected: this.selected.some(x => x.ws_id == item.ws_id)
          }))
          this.workspaceList = res.data;
          this.wsFilterList = res.data;
        }
        this.loading = false;
      }, error: (err) => {
        this.loading = false;
      }
    });
  }

  searchWs() {
    this.wsFilterList = this.filterPipe.transform(this.workspaceList.map(item => { return { ws_name: item.ws_name}}), this.filterText);
  }

  selectOption(type) {
    if (type === 'inverse') {
      this.wsFilterList.forEach(ws => {
        ws.selected = !ws.selected;
      });
      return;
    }
    let selected = type === 'all';
    this.wsFilterList.forEach(ws => {
      ws.selected = selected;
    });
  }

  select() {
    this.modal.close('close');
    this.saveEvent.emit(this.wsFilterList.filter(a => a.selected))
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

  get count() {
    return this.wsFilterList?.filter(a => a.selected)?.length
  }
}
