import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';


import { MultiTypeUploaderComponent } from '../../../../standalone/multi-type-uploader/multi-type-uploader.component';
import { LightFormBaseComponent } from '../../base-class/light-form-base/light-form-base.component';

import { DefaultFile } from '../../../../../constants/enums/core/default-file.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-light-file-upload',
  templateUrl: './light-file-upload.component.html',
  styleUrls: ['./light-file-upload.component.scss']
})
export class LightFileUploadComponent extends LightFormBaseComponent implements OnInit {
  @Input() config;
  @Input() heightClass = 'h-100';
  fileEnum = DefaultFile;
  
  

  constructor(
    public cdr: ChangeDetectorRef,
    public modalService: NgbModal, protected translate?: TranslateService
  ) {
    super(cdr, translate);
  }

  openfileUploader() {
    const modalRef = this.modalService.open(MultiTypeUploaderComponent, { centered: true, size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.config = this.config;
    modalRef.componentInstance.closeOnUpdate = true;
    modalRef.componentInstance.customAPIConfig = { config: this.fieldConfig.api, payload: {}, file_name: this.config?.filterKey };
    modalRef.result.then(res => {
      if (res?.url) {
        this.form?.get(this.field.key)?.setValue(res?.url);
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 200);
      }
    })
  }
}
