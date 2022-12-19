import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditorFontService {

  font: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(@Inject(DOCUMENT) private document: Document) { }

  loadStyle(fontConfig: any) {
    let font = this.font.getValue();
    if (font?.font === fontConfig?.font) return;
    // set font values 
    this.font.next(fontConfig);

    const editor = this.document.getElementById('campaign-editor');
    if (font?.font) {
      // remove old font link
      let themeLink = this.document.getElementById(`font-${font?.font.replace(/[^A-Z0-9]+/ig, "_")}`) as HTMLLinkElement;
      if (themeLink) {
        themeLink.remove()
      }
    }

    setTimeout(() => {
      const style = this.document.createElement('link');
      style.id = `font-${fontConfig.font.replace(/[^A-Z0-9]+/ig, "_")}`;
      style.rel = 'stylesheet';
      style.href = `${fontConfig.link}`;
      editor.appendChild(style);
    }, 1000);
  }
}