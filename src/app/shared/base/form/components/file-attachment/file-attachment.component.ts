import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// External Modules

import { FileService } from 'src/app/api/services/common/file/file.service';
import { environment } from 'src/environments/environment';

// Components
import { FormMultipleFileBaseComponent } from '../../base-class/form-base/form-multiple-file-base.component';

@Component({
  selector: 'app-file-attachment',
  templateUrl: './file-attachment.component.html',
  styleUrls: ['./file-attachment.component.scss']
})
export class FileAttachmentComponent extends FormMultipleFileBaseComponent implements OnInit {
  // defaultImage = environment.defaultImgUrl;
  // bucketAwsUrl = environment.bucketAwsUrl;

  constructor(
    
    public translate: TranslateService,
    public cdr: ChangeDetectorRef,
    public fileService: FileService) {
    super( cdr, translate, fileService);
  }

}
