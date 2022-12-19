import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getCSSVariableValue } from '../../../_metronic/kt/_utils';

@Component({
  selector: 'app-total-wl-widget',
  templateUrl: './total-wl-widget.component.html',
  styleUrls: ['./total-wl-widget.component.scss']
})
export class TotalWlWidgetComponent implements OnInit {
  chartOptions: any = {};

  @Input() svgIcon: string = '';
  @Input() cssClass: string = '';
  @Input() chartSize: number = 70;
  @Input() chartLine: number = 11;
  @Input() chartRotate?: number = 145;
  

  _data = null;
  @Input() set data(value) {
    this._data = value;
    if (value)
      this.configureChart();
  }
  get data() {
    return this._data;
  }
  // resultCount:any = this.data;
  id = Math.floor((Math.random() * 1000000) + 1).toString();
  constructor(public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {}

  configureChart() {
    setTimeout(() => {
      this.initChart(this.chartSize, this.chartLine, this.chartRotate);
    }, 100);
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

    // Init
    drawCircle('#714407', options.lineWidth, 1);
    drawCircle(getCSSVariableValue('--kt-primary'), options.lineWidth, this.data?.total_winner / this.data?.total_winner_looser);
    // drawCircle(getCSSVariableValue('--kt-success'), options.lineWidth, 100 / 250);
  }
}
