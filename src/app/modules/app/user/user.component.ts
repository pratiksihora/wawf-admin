import { ChangeDetectorRef, Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// External Modules
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';

// Services
import { TableService } from 'src/app/api/services/common/table/table.service';
import { TableExportService } from 'src/app/shared/_core/services/table/table-export.service';

// Components
import { TableApiComponent } from 'src/app/shared/base/table/base-class/table-api/table-api.component';

// Interfaces && Enums
import { TableConfig } from 'src/app/shared/constants/models/controls/table/table-config';
import { TableApiConfig } from 'src/app/shared/constants/models/controls/table/table-api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';

// Constants
import { configureTable } from './user.constant';

// Utils
import { TableApiUtil } from 'src/app/shared/_core/utils/api/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends TableApiComponent implements OnInit {
  @HostBinding('class') class = 'flex-fill';

  config: TableApiConfig = TableApiUtil.lazyTable({ idKey: 'user_id', module: ApiModule.API, paggingUrl: '/v1/reseller/user/pagging', title: 'User' });
  tableConfig: TableConfig;

  constructor(public tableService: TableService,
    public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef,
    public exportService: TableExportService, public permissionService: NgxPermissionsService,
    public translate: TranslateService) {
    super(tableService, activatedRoute, cdr, exportService)
  }

  ngOnInit(): void {
    this.tableConfig = configureTable(this.translate, this.permissionService, {});
  }

}
