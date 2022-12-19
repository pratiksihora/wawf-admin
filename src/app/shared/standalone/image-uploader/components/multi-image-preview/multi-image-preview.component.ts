import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { FileOptionUtil } from '../../../../../_core/utils/form/file';

@Component({
  selector: 'app-multi-image-preview',
  templateUrl: './multi-image-preview.component.html',
  styleUrls: ['./multi-image-preview.component.scss']
})
export class MultiImagePreviewComponent implements OnInit {

  @Input() image;
  
  

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.image.size = FileOptionUtil.convertFileSizeToMb(this.image?.size);
  }

  handleEvent(data) {

  }

}
