import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';


// Interfaces
import { ButtonConfig } from 'src/app/constants/models/controls/button/button-config';
import { Expression } from 'src/app/constants/models/controls/form/form-field-config';
import { ConfirmConfig } from 'src/app/constants/models/controls/modal/confirm-modal/config';

// Enums
import { ActionType } from 'src/app/constants/enums/common/action/action.enum';

// Services
import { ConfirmService } from '../../modal/confirm-modal/confirm-service/confirm.service';

// Utils
import { ComfirmationUtil } from 'src/app/_core/utils/confirmation';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() data?: any;
  @Input() options?: ButtonConfig;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Input() type?: 'reset' | 'submit' | 'button' | undefined;
  @Input() className?: string;
  @Input() action?: ActionType;
  @Input() aTag?: boolean;
  @Input() icon?: string;
  @Input() iconClass?: string;
  @Input() iconOnly?: boolean;
  @Input() rightIcon?: string;
  @Input() size?: 'xs' | 'sm' | 'lg' | undefined;
  @Input() space?: string;
  @Input() text?: string;
  @Input() textHTML?: string;
  @Input() tooltip?: string;
  @Input() permission?: string | string[];
  @Input() show?: (data: any) => {};
  @Input() expression?: Expression;
  @Input() confirmation?: ConfirmConfig;

  // output events
  @Output() buttonCallback = new EventEmitter<any>();

  hidden: boolean = false;

  btnOption: ButtonConfig;

  constructor(public confirmationService: ConfirmService,
    ) {
  }

  ngOnInit(): void {
    this._configureButton();
  }

  /**
    * Called when input properties of the component got changed
    * @param {SimpleChanges} changes contains the previous value and changed value
    */
  ngOnChanges(changes: SimpleChanges) {
    if (changes && Object.keys(changes)?.length) {
      this._configureButton();
    }
  }

  _configureButton() {
    this.btnOption = {
      type: this.type,
      className: this.className,
      iconClass: this.iconClass,
      action: this.action,
      aTag: this.aTag,
      icon: this.icon,
      iconOnly: this.iconOnly,
      rightIcon: this.rightIcon,
      size: this.size,
      text: this.text,
      textHTML: this.textHTML,
      tooltip: this.tooltip,
      permission: this.permission,
      space: this.space,
      show: this.show,
      ...this.options
    }

    this._checkPermissions();
  }

  _checkPermissions() {
    // check if it has visible permission
    if (this.btnOption?.permission) {
      let permissions = Array.isArray(this.btnOption?.permission) ? this.btnOption?.permission : [this.btnOption?.permission];
    }

    // visible expressions
    if (this.btnOption?.show) {
      const valid = this.btnOption.show(this.data);
      if (!valid) {
        this.hidden = true;
        return;
      };
    }
    this.hidden = false;
  }

  // emit click event
  click() {
    if (this.btnOption?.confirmation) {
      this.confirmationService.show(ComfirmationUtil.configure(this.btnOption?.confirmation), (response) => {
        this.buttonCallback.emit({ ...this, response, action: this.btnOption.action });
      });
      return;
    }
    this.buttonCallback.emit({ ...this, action: this.btnOption.action });
  }

  stopPropagation(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

}
