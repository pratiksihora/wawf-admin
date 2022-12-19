import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDroppableFile]'
})
export class DroppableFileDirective {

  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = '#FFF0DA';
  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#e2eefd';
  }

  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#FFF0DA';
  }

  @HostListener('drop', ['$event']) public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#FFF0DA';
    const files = event.dataTransfer.files;
    if (files?.length > 0) this.fileDropped.emit(files);
  }
}
