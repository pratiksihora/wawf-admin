import { Component, Input } from "@angular/core";
import moment from "moment-timezone";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexGrid
} from "ng-apexcharts";
import { UTCDateUtil } from "src/app/_core/utils/date/utc";

@Component({
  selector: 'app-statistics-line-chart',
  templateUrl: './statistics-line-chart.component.html',
  styleUrls: ['./statistics-line-chart.component.scss']
})

export class StatisticsLineChartComponent {
  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public grid: ApexGrid;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;

  @Input() cssClass: string = '';

  _data = null;
  @Input() set data(value) {
    this._data = value;
    if (value)
      this.initChartData();
  }
  get data() {
    return this._data;
  }

  public initChartData(): void {
    let first = this._data[0].date;
    let last = this._data[this._data.length - 1].date;
    let tz = moment();

    // add previous date 
    let values: any = {
      total: [],
      winner: [],
      loser: []
    }

    this._data.forEach((val, index) => {
      let date = moment(val.date).startOf('d').add(tz.utcOffset(), 'minute');
      let time = date.valueOf();
      values.total.push([time, val.total_participant]);
      values.winner.push([time, val.total_winner]);
      values.loser.push([time, val.total_looser]);
    });


    this.series = [
      {
        name: "Total Participate",
        data: values.total
      },
      {
        name: "Winner",
        data: values.winner,
        color: '#50cd89'
      },
      {
        name: "Loser",
        data: values.loser,
        color: '#f1416c'
      }
    ];

    this.grid = {
      padding: {
        left: 20,
        right: 40 // Also you may want to increase this (based on the length of your labels)
      },
    }
    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: false,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: "Campaigns Statistics",
      align: "left"
    };
    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        }
      },
    };

    this.xaxis = {
      type: 'datetime',
      // tickPlacement: 'between'
      // tickAmount: 8,
      // labels: {
      //   formatter: function (val, timestamp) {
      //     return moment(new Date(timestamp)).format("DD MMM")
      //   }
      // }
    };
    this.tooltip = {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toString();
        }
      }
    };
  }
}

