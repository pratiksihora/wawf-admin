import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {

  // image list
  @Input() imageList = [];

  // on click of any image
  @Output() imageClick = new EventEmitter<any>();

  
  constructor() { }

  ngOnInit(): void {
  }

  imageClickEvent(image) {
    this.imageClick.emit(image);
  }

}
