// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { ImageCroppedEvent, ImageTransform } from 'src/app/shared/ngx-image-cropper/src';

// @Component({
//   selector: 'app-image-cropper-direct',
//   templateUrl: './image-cropper-direct.component.html',
//   styleUrls: ['./image-cropper-direct.component.scss']
// })
// export class ImageCropperDirectComponent implements OnInit {
//   @Input() options: any = '';
//   croppedEvent: any = null;
//   type: any = 'jpeg';
//   @Output() croppedImage = new EventEmitter<any>();
//   canvasRotation = 0;
//   loading = false;
//   scale = 1;
//   // aspectRatio = 1 / 1;
//   aspectRatio = 4 / 3;
//   containWithinAspectRatio = false;
//   transform: ImageTransform = {};
//   coordinates = { x: 0 };

//   constructor() {
//     this.loading = true;
//   }

//   ngOnInit() {
//     if (!this.options?.round) {
//       this.aspectRatio = 4 / 3;
//     }
//     this.type = this.options?.imageChangedEvent.target.files[0].type.split('/')[1];
//   }

//   mousewheelHandler(event: any) {
//     var oEvent = event,
//       delta = oEvent.deltaY || oEvent.wheelDelta;
//     if (delta > 0) {
//       this.zoomOut();
//     } else {
//       this.zoomIn();
//     }
//   }

//   imageCropped(event: ImageCroppedEvent) {
//     this.croppedEvent = event;
//     this.loading = false;
//     this.croppedImage.emit(event.base64);
//   }

//   rotateLeft() {
//     this.canvasRotation--;
//     this.flipAfterRotate();
//   }

//   rotateRight() {
//     this.canvasRotation++;
//     this.flipAfterRotate();
//   }

//   private flipAfterRotate() {
//     const flippedH = this.transform.flipH;
//     const flippedV = this.transform.flipV;
//     this.transform = {
//       ...this.transform,
//       flipH: flippedV,
//       flipV: flippedH
//     };
//   }

//   flipHorizontal() {
//     this.transform = {
//       ...this.transform,
//       flipH: !this.transform.flipH
//     };
//   }

//   flipVertical() {
//     this.transform = {
//       ...this.transform,
//       flipV: !this.transform.flipV
//     };
//   }

//   resetImage() {
//     this.scale = 1;
//     this.canvasRotation = 0;
//     this.transform = {
//     };
//   }

//   zoomOut() {
//     let scale = this.scale;
//     if (scale >= 0.05) {
//       scale -= .03;
//       this.transform = {
//         ...this.transform,
//         scale: scale
//       };
//       this.scale = scale;
//     }
//   }

//   zoomIn() {
//     let scale = this.scale;
//     scale += .03;
//     this.transform = {
//       ...this.transform,
//       scale: scale
//     };
//     this.scale = scale;
//   }

//   toggleContainWithinAspectRatio() {
//     this.containWithinAspectRatio = !this.containWithinAspectRatio;
//   }
// }

