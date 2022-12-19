import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";

// External Modules
import { catchError, EMPTY, forkJoin, map, Observable } from "rxjs";

// Services
import { CampaignService } from "src/app/api/services/campaign/campaign.service";
import { CampaignStorageService } from "src/app/api/services/storage/campaign-storage.service";

//Utils
import { ApiUtil } from "../utils/api";
import { TokenUtil } from "../utils/token";

// Interfaces & Enums
import { ApiModule } from "src/app/api/enums/api-module.enum";
import { ApiAction } from "src/app/shared/constants/models/api";

// Constants
import { ROUTE_CONSTANTS } from "src/app/shared/constants/static-constants/routing";
import { CAMPAIGN_API } from "src/app/api/constants/campaign/campaign-api";

@Injectable({ providedIn: 'root' })
export class CampaignResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private campaignService: CampaignService,
    private storage: CampaignStorageService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> {
    TokenUtil.setCmpId(route.paramMap.get('cmp_id'));
    const campaign: ApiAction = ApiUtil.configureGet({ module: ApiModule.CAMPAIGN, url: CAMPAIGN_API.GET });
    const game: ApiAction = ApiUtil.configureGet({ module: ApiModule.CAMPAIGN, url: CAMPAIGN_API.GET_GAME });
    const validation: ApiAction = ApiUtil.configureGet({ module: ApiModule.CAMPAIGN, url: CAMPAIGN_API.GET_VALIDATION });
    const advance: ApiAction = ApiUtil.configureGet({ module: ApiModule.CAMPAIGN, url: CAMPAIGN_API.GET_ADVANCE });
    return forkJoin([
      this.campaignService.campaignCommon(campaign, { cmp_id: route.paramMap.get('cmp_id') }),
      this.campaignService.campaignCommon(game, { cmp_id: route.paramMap.get('cmp_id') }),
      this.campaignService.campaignCommon(validation, { cmp_id: route.paramMap.get('cmp_id') }),
      this.campaignService.campaignCommon(advance, { cmp_id: route.paramMap.get('cmp_id') })
    ]).pipe(map(res => {
      this.storage.setCampaignData(res[0].data,res[1].data, res[2].data,res[3].data )
      return res;
    }), catchError(err => {
      // this.router.navigate([ROUTE_CONSTANTS.ERROR]);
      return EMPTY;
    }));
  }
}