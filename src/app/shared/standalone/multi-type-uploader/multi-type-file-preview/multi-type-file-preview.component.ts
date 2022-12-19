import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-multi-type-file-preview',
  templateUrl: './multi-type-file-preview.component.html',
  styleUrls: ['./multi-type-file-preview.component.scss']
})
export class MultiTypeFilePreviewComponent implements OnInit {
  
  

  @Input() fileList = [];

  @Output() fileClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  fileClickEvent(file) {
    this.fileClick.emit(file);
  }
}
