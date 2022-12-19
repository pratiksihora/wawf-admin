import { Component, OnInit } from "@angular/core";

// Components
import { LightFormBaseComponent } from "./light-form-base.component";

@Component({ template: '' })

export abstract class LightFormOptionBaseComponent extends LightFormBaseComponent implements OnInit {
  items: any = [];

  /**
    * Fill options for select & multiselect filter type
    */
  _fillOptions() {
    const defaultValue = this.field.defaultValue !== undefined ? this.field.defaultValue : null;

    let options: any = [];
    // fill static options
    if (this.field.options) {
      options = this.field.options;
    }

    // fill outer options
    if (this.options) {
      options = this.options;
    }

    this.items = this.field.prepareOptions ? this.field.prepareOptions({
      options: options || [], values: this.values || defaultValue
    }) : options;
    return this.items;
  }
}