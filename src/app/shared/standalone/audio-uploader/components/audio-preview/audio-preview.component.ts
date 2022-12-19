import { Component, EventEmitter, ElementRef, Input, OnInit, Output, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-audio-preview',
  templateUrl: './audio-preview.component.html',
  styleUrls: ['./audio-preview.component.scss']
})
export class AudioPreviewComponent implements OnInit, OnChanges {

  @ViewChild('previewaudio') audio: ElementRef;
  @Input() audioList = [];
  @Output() audioClick = new EventEmitter();

  audioUrl: string;
  playing: boolean = false;
  

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.clearCurrentAudio();
  }

  playAudio(event, audio) {
    this.clearCurrentAudio();
    this.stopPropagtion(event)
    audio.isPlayed = true;
    this.playing = true;
    this.audio.nativeElement.src = (audio.url);
    this.audio.nativeElement.play();
  }

  pauseAudio(event, audio) {
    this.stopPropagtion(event)
    audio.isPlayed = false;
    this.playing = false;
    this.audio.nativeElement.pause();
  }

  clearCurrentAudio() {
    let currentAudio: any = this.audioList.find(audioItem => audioItem && audioItem?.isPlayed);
    if (currentAudio) {
      currentAudio.isPlayed = false;
      this.playing = false;
    }
    if (this.audio?.nativeElement?.src)
      this.audio.nativeElement.src = '';
  }

  chooseAudio(event, audio) {
    this.stopPropagtion(event)
    if (this.playing) {
      this.audio.nativeElement.pause();
    }
    this.audioClick.emit(audio);
    this.clearCurrentAudio();
  }

  stopPropagtion(event) {
    event.stopPropagation();
  }

}
