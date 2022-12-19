import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, ImageTransform } from 'src/app/libraries/ngx-image-cropper/src';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-croper',
  templateUrl: './image-croper.component.html',
  styleUrls: ['./image-croper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageCroperComponent implements OnInit {

  @Input() options: any = '';

  croppedEvent: any = null;
  type: any = 'jpeg';
  croppedImage: any = '';
  canvasRotation = 0;
  loading = false;
  scale = 1;
  aspectRatio = 1 / 1;

  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  defaultImage = environment.defaultImgUrl;
  bucketAwsUrl = environment.bucketAwsUrl;

  constructor(public activeModal: NgbActiveModal) {
    this.loading = true;
  }

  ngOnInit() {
    if (!this.options?.round) {
      this.aspectRatio = 4 / 3;
    }
    this.type = this.options?.imageChangedEvent.target.files[0].type.split('/')[1];
  }

  mousewheelHandler(event: any) {
    var oEvent = event,
      delta = oEvent.deltaY || oEvent.wheelDelta;
    if (delta > 0) {
      this.zoomOut();
    } else {
      this.zoomIn();
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedEvent = event;
    this.loading = false;
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.canvasRotation = 0;
    this.transform = {
    };
  }

  zoomOut() {
    let scale = this.scale;
    if (scale >= 0.05) {
      scale -= .03;
      this.transform = {
        ...this.transform,
        scale: scale
      };
      this.scale = scale;
    }
  }

  zoomIn() {
    let scale = this.scale;
    scale += .03;
    this.transform = {
      ...this.transform,
      scale: scale
    };
    this.scale = scale;
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  saveClickHandler() {
    this.activeModal.close(this.croppedEvent);
  }
}

