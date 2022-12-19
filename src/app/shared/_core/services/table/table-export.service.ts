import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ObjectUtils } from 'src/app/libraries/prime/utils';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class TableExportService {
  csvSeparator = ',';
  exportFunction = null;
  exportFilename = new Date().toISOString();
  constructor(public translateService: TranslateService) { }


  exportPdf(rows, options) {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc: any = new jsPDF.default();

        rows = this.makePdfExportData(rows, options);

        let columns = [];
        (options.columns || []).forEach(col => {
          !col.exportDisable && columns.push({ title: col.header, dataKey: col.field });
        })

        doc.autoTable(columns, rows);
        let fileName = '';
        if (options && options.header && options.header.title) {
          fileName = this.translateService.instant(options.header.title);
        }
        doc.save(`${this.exportFilename}.pdf`);
      });
    });
  }

  makePdfExportData(rows, options) {
    return (rows || []).map(row => {
      const data = {};
      (options.columns || []).map(column => {
        if (!column.exportDisable)
          data[column.field] = this.prepareValue(column, row);
      });

      return data;
    });
  }

  makeExportData(rows, options) {
    if (rows.length) {
      return (rows || []).map(row => {
        const data = {};
        (options.columns || []).map(column => {
          if (!column.exportDisable)
            data[column.header] = this.prepareValue(column, row);
        });
        return data;
      });
    }

    const data = {};
    (options.columns || []).map(column => {
      if (!column.exportDisable)
        data[column.header] = column.header;
    });
    return data;
  }

  exportExcel(rows, options) {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(rows.length ? this.makeExportData(rows, options) : [this.makeExportData(rows, options)], { skipHeader: !rows.length });
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      let fileName = '';
      if (options && options.header && options.header.title) {
        fileName = this.translateService.instant(options.header.title);
      }
      this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

  public exportCSVFile(data: any, fileName = null, options) {
    let csv = '';
    const columns = options.columns;

    // headers
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (!column.exportDisable && column.field) {
        csv += '"' + (column.header || column.field) + '"';

        if (i < (columns.length - 1)) {
          csv += this.csvSeparator;
        }
      }
    }

    // body
    data.forEach((record, i) => {
      csv += '\n';
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        if (!column.exportDisable && column.field) {

          let cellData = this.prepareValue(column, record);

          if (cellData) {
            if (this.exportFunction) {
              cellData = this.exportFunction({
                data: cellData,
                field: column.field,
              });
            } else {
              cellData = String(cellData).replace(/"/g, '""');
            }
          } else {
            cellData = (column && column.isNumber) ? 0 : '';
          }

          csv += '"' + cellData + '"';

          if (i < (columns.length - 1)) {
            csv += this.csvSeparator;
          }
        }
      }
    });

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    let nav: any = window.navigator;

    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blob, (fileName || this.exportFilename) + '.csv');
    } else {
      const link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', (fileName || this.exportFilename) + '.csv');
        link.click();
      } else {
        csv = 'data:text/csv;charset=utf-8,' + csv;
        window.open(encodeURI(csv));
      }
      document.body.removeChild(link);
    }
  }

  prepareValue(column, record) {
    let value = record[column.field]
    switch (column.displayType) {
      case 'status':
        value = record[column.field]?.status || column.blank || ''
        break;
      case 'progress':
        value = record[column.field]?.value || column.blank || '';
        break;
      case 'user-with-image':
        value = record[column.field]?.name || column.blank || '';
        break;
      default:
        break;
    }
    return value;
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    saveAs.saveAs(data, `${this.exportFilename}${EXCEL_EXTENSION}`);
  }
}
