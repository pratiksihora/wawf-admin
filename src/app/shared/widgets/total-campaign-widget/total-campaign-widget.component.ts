import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getCSSVariableValue } from '../../../_metronic/kt/_utils';

@Component({
  selector: 'app-total-campaign-widget',
  templateUrl: './total-campaign-widget.component.html',
  styleUrls: ['./total-campaign-widget.component.scss']
})
export class TotalCampaignWidgetComponent implements OnInit {
  chartOptions: any = {};

  @Input() svgIcon: string = '';
  @Input() cssClass: string = '';
  @Input() chartSize: number = 70;
  @Input() chartLine: number = 11;
  @Input() chartRotate?: number = 145;
  live: any;
  pause: any;
  draft: any;
  total: any;
  expired: any;
  

  _data = null;
  @Input() set data(value) {
    this._data = value;
    if (value)
      this.configureChart();
  }
  get data() {
    return this._data;
  }

  id = Math.floor((Math.random() * 1000000) + 1).toString();
  constructor(public cdr: ChangeDetectorRef,) { }

  ngOnInit(): void { }

  configureChart() {
    setTimeout(() => {
      this.initChart(this.chartSize, this.chartLine, this.chartRotate);
    }, 100);
    this.total = this.data.reduce((previous, current) => previous + current.count, 0);
    this.live = this.data.find(x => x.status === 'Live')?.count || 0;
    this.pause = this.data.find(x => x.status === 'Pause')?.count || 0;
    this.draft = this.data.find(x => x.status === 'Draft')?.count || 0;
    this.expired = this.data.find(x => x.status === 'Expired')?.count || 0;
  }

  initChart(chartSize: number = 70, chartLine: number = 11, chartRotate: number = 145) {

    const el = document.getElementById(this.id);

    if (!el) {
      return;
    }

    var options = {
      size: chartSize,
      lineWidth: chartLine,
      rotate: chartRotate,
      //percent:  el.getAttribute('data-kt-percent') ,
    };

    const canvas = document.createElement('canvas');
    const span = document.createElement('span');

    // @ts-ignore
    if (typeof G_vmlCanvasManager !== 'undefined') {
      // @ts-ignore
      G_vmlCanvasManager.initElement(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = options.size;

    el.appendChild(span);
    el.appendChild(canvas);

    // @ts-ignore
    ctx.translate(options.size / 2, options.size / 2); // change center
    // @ts-ignore
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
    const radius = (options.size - options.lineWidth) / 2;

    const drawCircle = function (
      color: string,
      lineWidth: number,
      percent: number
    ) {
      percent = Math.min(Math.max(0, percent || 1), 1);
      if (!ctx) {
        return;
      }

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
      ctx.strokeStyle = color;
      ctx.lineCap = 'round'; // butt, round or square
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    //Init
    this.draft !== 0 && drawCircle('#EBB061', options.lineWidth, 1); // draft
    (this.live + this.pause + this.expired !== 0 || this.live + this.pause + this.expired + this.draft === 0) && drawCircle('#EA8F13', options.lineWidth, (this.live + this.pause + this.expired) / this.total); // live
    this.pause + this.expired !== 0 && drawCircle('#714407', options.lineWidth, (this.pause + this.expired) / this.total); // pause
    this.expired !== 0 && drawCircle('red', options.lineWidth, this.expired / this.total); // exprired
  }

}
