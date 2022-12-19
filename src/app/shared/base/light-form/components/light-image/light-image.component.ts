import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { DefaultFile } from '../../../../../constants/enums/core/default-file.enum';
import { ImageUploaderComponent } from '../../../../standalone/image-uploader/image-uploader.component';
import { LightFormBaseComponent } from '../../base-class/light-form-base/light-form-base.component';

@Component({
  selector: 'app-light-image',
  templateUrl: './light-image.component.html',
  styleUrls: ['./light-image.component.scss']
})
export class LightImageComponent extends LightFormBaseComponent implements OnInit {

  fileEnum = DefaultFile;
  
  
  constructor(private modalService: NgbModal, public cdr: ChangeDetectorRef) {
    super();
  }

  preparePayloadData() {
  }

  openImageUploader() {
    const payload = {
      type: this.fieldConfig.api.storage || 'general'
    }

    const modalRef = this.modalService.open(ImageUploaderComponent, { centered: true, backdrop: 'static', scrollable: true, size: 'xl' });
    modalRef.componentInstance.closeOnUpdate = true;
    modalRef.componentInstance.customAPIConfig = { config: this.field.api, payload, file_name: 'name' };
    modalRef.result.then(res => {
      if (res?.bucketUrl) {
        this.form?.get(this.field.key)?.setValue(res?.bucketUrl);
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      }
    });
  }
}
