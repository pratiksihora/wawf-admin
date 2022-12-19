import { ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//environment
import { environment } from 'src/environments/environment';

// Services
import { WorkspaceService } from 'src/app/api/services/workspace/workspace.service';
import { WorkspaceStorageService } from 'src/app/api/services/storage/workspace-storage.service';

// Enums and Interfaces
import { ApiModule } from 'src/app/api/enums/api-module.enum';
import { ApiAction } from 'src/app/constants/models/api';
import { UserStatus } from 'src/app/constants/enums/user/user-status.enum';
import { PlanStatus } from 'src/app/constants/enums/billing/plan-status.enum';

// Utils
import { ApiUtil } from 'src/app/_core/utils/api';
import { TokenUtil } from 'src/app/_core/utils/token';

// Constants
import { WORKSPACE_API } from 'src/app/api/constants/workspace/workspace-api';
import { BILLING_API } from 'src/app/api/constants/billing/billing-api';
import { BusinessStorageService } from 'src/app/api/services/storage/business-storage.service';
import { UserRoleAssociate } from 'src/app/constants/enums/user/user-role-associate.enum';
import { CampaignStorageService } from 'src/app/api/services/storage/campaign-storage.service';

@Component({
  selector: 'app-workspace-navigator',
  templateUrl: './workspace-navigator.component.html',
  styleUrls: ['./workspace-navigator.component.scss']
})
export class WorkspaceNavigatorComponent implements OnInit {
  @ViewChild('menu', { static: true }) menu: ElementRef;

  loading: boolean = false;
  workspaceList: any = []
  selectedWorkspace: any;
  integrationCount: any;
  billingFE = environment.apps.billing_fe;
  bsId: string = TokenUtil.getBsId();
  business: any;
  roleEnum = UserRoleAssociate;
  userEnum = UserStatus;
  planEnum = PlanStatus;

  constructor(public wsService: WorkspaceService, public businessstorage: BusinessStorageService, public storage: WorkspaceStorageService, public cmpstorage: CampaignStorageService, public cdr: ChangeDetectorRef, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.business = this.businessstorage.getBusiness();
    this.getWorkspaceList();
    this.refreshWorkspace();
    this.getIntegrationCount();
    this.cmpstorage.interaction.subscribe(res => {
      console.log('interaction')
      this.getIntegrationCount();
      this.cdr.detectChanges();
    })
  }

  refreshWorkspace() {
    this.storage.workspaceReload(true).subscribe({
      next: (data) => {
        if (data) {
          this.getWorkspaceList();
          this.storage.setWorkspaceReload(false);
        }
      }
    })
  }

  getWorkspaceList() {
    this.loading = true;
    let wsId = this.route.snapshot.paramMap.get('ws_id');
    const common: ApiAction = ApiUtil.configureGet({ module: ApiModule.WORKSPACE, url: WORKSPACE_API.ALL })
    this.wsService.workspaceCommon(common).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.workspaceList = res.data;
          this.selectedWorkspace = res.data?.find(a => a.ws_id == wsId);
        }
        this.loading = false;
        this.cdr.detectChanges();
      }, error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  navigateToWorkspace(ws: any) {
    window.location.href = `${TokenUtil.getBsId()}/workspace/${ws.ws_id}`;
  }

  navigateToChooseWorkspace() {
    this.router.navigate([`${TokenUtil.getBsId()}/choose-workspace`]);
  }

  getIntegrationCount() {
    this.loading = true;
    const common: ApiAction = ApiUtil.configureGet({ module: ApiModule.BUSINESS, url: BILLING_API.INTERACTION_COUNT })
    this.wsService.workspaceCommon(common).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.integrationCount = res.data;
          this.cdr.detectChanges();
        }
        this.loading = false;
      }
    });
  }

  navigateToSubscription() {
    window.open(`${this.billingFE + '/' + this.bsId + '/subscription'}`, "_blank");
  }

  navigateToPlan() {
    window.open(`${this.billingFE + '/' + this.bsId + '/plan'}`, "_blank");
  }

}
