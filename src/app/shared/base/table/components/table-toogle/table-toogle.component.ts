import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// Interfaces
import { TableColumn } from 'src/app/shared/constants/models/controls/table/table-config';

@Component({
  selector: 'app-table-toogle',
  templateUrl: './table-toogle.component.html',
  styleUrls: ['./table-toogle.component.scss']
})
export class TableToogleComponent implements OnInit {

  @Input() columns: TableColumn[];

  // Events
  @Output() closeEvent = new EventEmitter<string>();
  @Output() saveEvent = new EventEmitter<TableColumn[]>();


  constructor(public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  close() {
    this.closeEvent.emit('close');
  }

  save() {
    this.saveEvent.emit(this.columns);
  }

  selectUnSelectAll(visible) {
    this.columns.forEach(col => col.visible = visible);
  }

  cdkDropEvent(event: CdkDragDrop<TableColumn[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
