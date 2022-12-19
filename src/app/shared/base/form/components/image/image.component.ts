import { ChangeDetectorRef, Component, OnInit } from '@angular/core';


// External Modules
import { NgxPermissionsService } from 'ngx-permissions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Components
import { FormBaseComponent } from '../../base-class/form-base/form-base.component';
import { ImageUploaderComponent } from 'src/app/shared/standalone/image-uploader/image-uploader.component';
import { DefaultFile } from 'src/app/shared/constants/enums/core/default-file.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends FormBaseComponent implements OnInit {

  fileEnum = DefaultFile;
  defaultImage = environment.defaultImgUrl;
  bucketAwsUrl = environment.bucketAwsUrl;
  constructor(public modalService: NgbModal, public permissionService: NgxPermissionsService, public cdr: ChangeDetectorRef) {
    super(permissionService, cdr);
  }

  openImageUploader() {
    const payload = {
      type: this.fieldConfig.api.storage || 'general'
    }
    const modalRef = this.modalService.open(ImageUploaderComponent, { centered: true, backdrop: 'static', scrollable: true, size: 'xl' });
    modalRef.componentInstance.closeOnUpdate = true;
    modalRef.componentInstance.customAPIConfig = { config: this.field.api, payload, file_name: 'name' };
    modalRef.result.then(res => {
      console.log(res, 'data====>')
      if (res?.bucketUrl) {
        this.form?.get(this.field.key)?.setValue(res?.bucketUrl);
        console.log(this.form?.get(this.field.key)?.setValue(res?.bucketUrl))
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      }
    });
  }
}
