import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// External Modules
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';

// Internal Modules
import { LoaderModule } from '../../base/loader/loader/loader.module';
import { NoResultFoundModule } from '../../base/no-result-found/no-result-found.module';

// Components
import { GiphyComponent } from './components/giphy/giphy.component';
import { PexelsComponent } from './components/pexels/pexels.component';
import { PixabayComponent } from './components/pixabay/pixabay.component';
import { TenorComponent } from './components/tenor/tenor.component';
import { UnsplashComponent } from './components/unsplash/unsplash.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { UploadLinkComponent } from './components/upload-link/upload-link.component';
import { MultiImageUploadComponent } from './components/multi-image-upload/multi-image-upload.component';
import { MultiImagePreviewComponent } from './components/multi-image-preview/multi-image-preview.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { ImageUploaderComponent } from './image-uploader.component';


@NgModule({
  declarations: [
    ImageUploaderComponent,
    ImagePreviewComponent,
    TenorComponent,
    UnsplashComponent,
    GiphyComponent,
    PexelsComponent,
    PixabayComponent,
    GalleryComponent,
    UploadLinkComponent,
    MultiImageUploadComponent,
    MultiImagePreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    /*** EXTERNAL MODULES ***/
    NgbModalModule,
    TranslateModule.forChild(),
    InlineSVGModule,
    /*** CUSTOM MODULES ***/
    LoaderModule,
    NoResultFoundModule,
    NgbTooltipModule,
  ],
  exports: [
    ImageUploaderComponent,
    GalleryComponent
  ]
})
export class ImageUploaderModule { }
