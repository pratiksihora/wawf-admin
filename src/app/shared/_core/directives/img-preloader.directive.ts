import { ChangeDetectorRef, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
    selector: '[img-preloader]',
    host: {
        '[attr.src]': 'finalImage'
    }
})

export class ImagePreloader {

    _targetSource: string;

    @Input('img-preloader') set targetSource(value) {
        this._targetSource = value;
        this.imgPreLoadData();
    }

    get targetSource() {
        this.cdr.detectChanges();
        return this._targetSource;
    }

    @Input('onErrorImage') errorImgSource: string;

    @Input('error') error: any;

    downloadingImage: any;
    finalImage: any;

    @HostListener('error')
    onError() {
        this.onErrorImage()
    }

    // Set an input so the directive can set a default image.
    @Input() defaultImage: string = '../../../assets/media/placeholder/Placeholder  GIF 01.gif'
    constructor(private _elemRef: ElementRef, private cdr: ChangeDetectorRef) {

    }

    imgPreLoadData() {
        this.finalImage = this.defaultImage;
        this.setHeightInSrc();
        const isLocalImage = (this.targetSource?.indexOf('./assets/') > -1);

        this.downloadingImage = document.createElement('img');
        this.downloadingImage.onload = () => {
            this.finalImage = this.targetSource;
            if (isLocalImage) {
                // this.finalImage = environment.bucketImageUrl + this.finalImage.replace('./assets', '/assets');
                this.finalImage = 'https://picsum.photos/200/300';
            }
            setTimeout(() => {
                this.cdr.detectChanges();
            }, 100);
        }
        this.downloadingImage.onerror = () => {
            this.onErrorImage();
        }
        this.downloadingImage.src = this.targetSource;
        setTimeout(() => {
            this.cdr.detectChanges();
        }, 100);
    }

    onErrorImage() {
        // const isLocalImage = (this.targetSource.indexOf('./assets/') > -1);

        // if (isLocalImage) {
        //     this.finalImage = this.targetSource || '';
        // } else {
        this.finalImage = this.errorImgSource;
        // }
        this.setHeightInSrc();
    }

    setHeightInSrc(isRemove = false) {
        const el = this._elemRef.nativeElement;
        if (el) {
            if (isRemove) {
                el.setAttribute('style', 'height: auto');
            }
        }
        this.cdr.detectChanges();
    }
}