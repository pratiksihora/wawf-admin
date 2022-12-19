import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// External Modules
import { NgxPermissionsService } from 'ngx-permissions';
import { FileService } from 'src/app/api/services/common/file/file.service';

// Components
import { FormMultipleFileBaseComponent } from '../../base-class/form-base/form-multiple-file-base.component';

// 
import { FileConstant } from 'src/app/shared/constants/enums/controls/file/file-constant.enum';

@Component({
  selector: 'app-multi-image-upload',
  templateUrl: './multi-image-upload.component.html',
  styleUrls: ['./multi-image-upload.component.scss']
})
export class MultiImageUploadComponent extends FormMultipleFileBaseComponent implements OnInit {

  defaultImage = FileConstant.IMAGE_URL;

  constructor(
    public permissionService: NgxPermissionsService,
    public translate: TranslateService,
    public cdr: ChangeDetectorRef,
    public fileService: FileService) {
    super(permissionService, cdr, translate, fileService);
  }

}
