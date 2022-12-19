import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';

import {
  defaultDrawerOptions,
  DrawerComponent as KTDrawerComponent,
} from 'src/app/_metronic/kt/components';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  /**
    * External inputs
    */
  @Input() show: boolean = false;
  @Input() position: string = 'end';

  @Input() drawerTitle: string = '';
  @Input() bodyTemplate: any;
  @Input() overlayDisable: boolean = false;
  @Input() width: any = "{ default: '300px', 'lg': '500px',  'md': '500px' }";

  // Events
  @Output() closeEvent = new EventEmitter<any>();
  @Output() saveEvent = new EventEmitter<any>();
  @Output() changePosition = new EventEmitter<any>();

  @ViewChild('drawer', { static: true }) drawer: ElementRef;
  drawerComponent;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.drawerComponent = new KTDrawerComponent(this.drawer.nativeElement, {
      overlay: !this.overlayDisable,
      baseClass: 'drawer',
      overlayClass: 'drawer-overlay',
      direction: this.position || 'end',
    });

    this.drawerComponent.on('kt.drawer.after.hidden', (data) => {
      this.close();
    });

    this._handleDrawer();
  }

  ngOnChanges(changes: SimpleChange | any) {
    if (changes?.position?.currentValue !== undefined && this.drawerComponent) {
      this.drawerComponent.update({ direction: this.position });
    }

    if (changes?.position?.currentValue !== undefined && this.drawerComponent) {
      this.drawerComponent.update({ minimized: this.position });
    }

    if (changes?.show?.currentValue !== undefined && this.drawerComponent) {
      this._handleDrawer();
    }
  }

  _handleDrawer() {
    if (this.show)
      this.drawerComponent.show();
    else
      this.drawerComponent.hide();
  }

  save() {
    this.saveEvent.emit({})
  }

  positionUpdate() {
    this.changePosition.emit({});
  }

  close() {
    this.show && this.closeEvent.emit({});
    this.cdr.detectChanges();
  }
}
