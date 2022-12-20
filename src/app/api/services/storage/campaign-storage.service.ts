import { Injectable } from "@angular/core";

// External Modules
import { BehaviorSubject, catchError, Observable, map, } from "rxjs";
import { ApiAction } from "src/app/constants/models/api";
import { ApiUtil } from "src/app/shared/_core/utils/api";
import { StorageUtil } from "src/app/shared/_core/utils/storage";
import { CAMPAIGN_API } from "../../constants/campaign/campaign-api";
import { ApiModule } from "../../enums/api-module.enum";
import { CampaignService } from "../campaign/campaign.service";
import { prepareResultConstant } from "./result.constant";

@Injectable({ providedIn: 'root' })
export class CampaignStorageService {

  campaign: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  game: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  validation: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  advance: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  result: BehaviorSubject<any> = new BehaviorSubject<any>({

  });

  interaction: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private campaignService: CampaignService) {
  }

  public setCampaignData(campaign?: any, game?: any, validation?: any, advance?: any): any {
    this.setCampaign(campaign);
    validation && this.validation.next(validation);
    game && this.game.next(game);
    advance && this.advance.next(advance);
    this.setResult(prepareResultConstant(campaign, advance, validation));
  };

  /**
   * Set campaign Data
   * @param campaign : Api common payload object
   * @returns void
   */
  public setCampaign(campaign?: any): any {
    // set time zone
    campaign && StorageUtil.setTimeZone(campaign.cmp_tz);
    this.campaign.next(campaign);
  }

  /**
   * Get campaign Data
   * @returns Observable<campaign>
   */
  public getCampaign(observable: boolean = false): Observable<any> {
    if (!observable) return this.campaign.getValue();
    return this.campaign.asObservable();
  }

  /**
   * Update campaign Data
   * @param campaign : Api common payload object
   * @returns void
   */
  public updateCampaign(campaign?: any): any {
    const api: ApiAction = ApiUtil.configureGet({ module: ApiModule.CAMPAIGN, url: CAMPAIGN_API.GET });
    return this.campaignService.campaignCommon(api, { cmp_id: campaign.cmp_id }).subscribe(res => {
      if (res.succeeded) {
        this.setCampaign(res.data);
        this.setResult(prepareResultConstant(res.data, this.advance.getValue(), this.validation.getValue()));
      }
      return res.data;
    });
  }

  /**
   * Set campaign Data
   * @param campaign : Api common payload object
   * @returns void
   */
  public setGame(game?: any): any {
    this.game.next(game);
  }

  /**
   * Get campaign Data
   * @returns Observable<campaign>
   */
  public getGame(observable: boolean = false): Observable<any> {
    if (!observable) return this.game.getValue();
    return this.game.asObservable();
  }



  /**
   * Update campaign game
   * @param campaign : Api common payload object
   * @returns void
   */
  public updateGame(campaign?: any): any {
    const game: ApiAction = ApiUtil.configureGet({ module: ApiModule.CAMPAIGN, url: CAMPAIGN_API.GET_GAME });
    return this.campaignService.campaignCommon(game, { cmp_id: campaign.cmp_id }).pipe(map(res => {
      if (res.succeeded)
        this.game.next(res.data);
      return res.data;
    }));
  }

  /**
  * Set campaign Data
  * @param campaign : Api common payload object
  * @returns void
  */
  public setValidation(validation?: any): any {
    this.validation.next(validation);
  }

  /**
   * Get campaign Data
   * @returns Observable<campaign>
   */
  public getValidation(observable: boolean = false): Observable<any> {
    if (!observable) return this.validation.getValue();
    return this.validation.asObservable();
  }

  /**
   * Update campaign game
   * @param campaign : Api common payload object
   * @returns void
   */
  public updateValidation(campaign?: any): any {
    const api: ApiAction = ApiUtil.configureGet({ module: ApiModule.CAMPAIGN, url: CAMPAIGN_API.GET_VALIDATION });
    return this.campaignService.campaignCommon(api, { cmp_id: campaign.cmp_id }).subscribe(res => {
      if (res.succeeded) {
        this.validation.next(res.data);
        this.setResult(prepareResultConstant(res.data, this.advance.getValue(), this.validation.getValue()));
      }
      return res.data;
    });
  }

  /**
 * Set campaign Data
 * @param campaign : Api common payload object
 * @returns void
 */
  public setAdvance(advance?: any): any {
    this.advance.next(advance);
  }

  /**
   * Get campaign Data
   * @returns Observable<campaign>
   */
  public getAdvance(observable: boolean = false): Observable<any> {
    if (!observable) return this.advance.getValue();
    return this.advance.asObservable();
  }

  /**
   * Update campaign game
   * @param campaign : Api common payload object
   * @returns void
   */
  public updateAdvanceSetting(campaign?: any): any {
    const advance: ApiAction = ApiUtil.configureGet({ module: ApiModule.CAMPAIGN, url: CAMPAIGN_API.GET_ADVANCE });
    return this.campaignService.campaignCommon(advance, { cmp_id: campaign.cmp_id }).pipe(map(res => {
      if (res.succeeded)
        this.advance.next(res.data);
      this.setResult(prepareResultConstant(this.campaign.getValue(), res.data, this.validation.getValue()));
      return res.data;
    }));
  }


  /**
 * Set campaign Data
 * @param campaign : Api common payload object
 * @returns void
 */
  public setResult(result?: any): any {
    this.result.next(result);
  }

  /**
   * Get campaign Data
   * @returns Observable<campaign>
   */
  public getResult(observable: boolean = false): Observable<any> {
    if (!observable) return this.result.getValue();
    return this.result.asObservable();
  }

  /**
   * Update campaign game
   * @param campaign : Api common payload object
   * @returns void
   */
  public updateResult(result?: any): any {
    this.result.next(result);
  }
}