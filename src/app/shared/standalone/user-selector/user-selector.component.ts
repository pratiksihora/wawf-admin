import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiUtil } from 'src/app/_core/utils/api';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Services
import { UserService } from 'src/app/api/services/user/user.service';

// Enums and Interfaces
import { ApiModule } from 'src/app/api/enums/api-module.enum';
import { ApiAction } from 'src/app/constants/models/api';

// Constants
import { USER_API } from 'src/app/api/constants/user/user-api';

//pipe
import { FilterPipe } from 'src/app/_core/pipes/filter-pipe/filter.pipe';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {

  @Input() selected: any;

  @Output() saveEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();

  loading: boolean = false;
  filterText: string = '';
  userList: any = [];
  userFilterList: any = [];
  constructor(public modal: NgbActiveModal, public userService: UserService, public filterPipe: FilterPipe) { }

  ngOnInit(): void {
    this.getUserList()
  }

  // get all User list
  getUserList() {
    this.loading = true;
    const common: ApiAction = ApiUtil.configureGet({ module: ApiModule.BUSINESS, url: USER_API.TEAM, title: '' })
    this.userService.userCommon(common).subscribe({
      next: (res) => {
        if (res.succeeded) {
          res.data = res.data.map(item => ({
            ...item, selected: this.selected.some(x => x.ub_id == item.ub_id)
          }))
          this.userList = res.data;
          this.userFilterList = res.data;
        }
        this.loading = false;
      }, error: (err) => {
        this.loading = false;
      }
    });
  }

  searchUser() {
    this.userFilterList = this.filterPipe.transform(this.userList, this.filterText)
  }

  selectOption(type) {
    if (type === 'inverse') {
      this.userFilterList.forEach(ws => {
        ws.selected = !ws.selected;
      });
      return;
    }
    let selected = type === 'all';
    this.userFilterList.forEach(ws => {
      ws.selected = selected;
    });
  }

  select() {
    this.modal.close('close');
    this.saveEvent.emit(this.userList.filter(a => a.selected))
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

  get count() {
    return this.userList?.filter(a => a.selected)?.length
  }

}
