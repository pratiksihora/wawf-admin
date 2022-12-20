import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from '../app/i18n/translation.service';
// language list
import { locale as enLang } from '../app/i18n/vocabs/en';
import { locale as chLang } from '../app/i18n/vocabs/ch';
import { locale as esLang } from '../app/i18n/vocabs/es';
import { locale as jpLang } from '../app/i18n/vocabs/jp';
import { locale as deLang } from '../app/i18n/vocabs/de';
import { locale as frLang } from '../app/i18n/vocabs/fr';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService
  ) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

  ngOnInit() {
    this.modeService.init();
  }
}
