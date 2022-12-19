import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenUtil } from '../../../_core/utils/token';

declare var HUBSPOT_API: any;

@Injectable({
  providedIn: 'root'
})
export class HubspotService {
  private renderer: Renderer2;
  loadedHubspotWidget = false;
  isDisplayHubspotWidget$: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private _document) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.renderBlankScript();
  }

  renderBlankScript() {
    const script = this.renderer.createElement('script');
    script.setAttribute('id', 'tawk_custom_script');
    script.text = `var HUBSPOT_API = HUBSPOT_API || {};`
    this.renderer.appendChild(this._document.body, script);
  }

  openChat() {
    this.isDisplayHubspotWidget$.next(true);
    TokenUtil.setHubspotStatus(true);

    if (this.loadedHubspotWidget) {
      this.isDisplayHubspotWidget$.next(true);
      window['HubSpotConversations']?.widget.load();
      
     
      return;
    }

    const script = this.renderer.createElement('script');
    script.setAttribute('id', 'hs-script-loader');
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    script.setAttribute('src', '//js-na1.hs-scripts.com/22484668.js')
    script.setAttribute('type', 'text/javascript')

    this.renderer.appendChild(this._document.body, script);
    this.loadedHubspotWidget = true;
    setTimeout(() => {
      window['HubSpotConversations']?.widget.open()
    }, 100);
  }


  closeChat(clearStorage: boolean = false) {
    clearStorage && TokenUtil.removeHubspotStatus();
    this.isDisplayHubspotWidget$.next(false);
    window['HubSpotConversations'].widget.close({});
    setTimeout(() => {
      window['HubSpotConversations'].widget.remove();
    }, 100);
  }

}
