import { Injectable } from '@angular/core';
import {Howl, Howler} from 'howler';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  sound = new Howl({
    src: ['../../assets/mp3/What-if-a-Day-harp/What-if-a-Day.mp3']
  })
  volume: number = 0.20

  constructor() { }

  start() {
    console.log("playing")
    // Play the sound.
    this.sound.play()

    // Change global volume.
    Howler.volume(this.volume);
  }
 
  getVolume(): number {
    return this.sound.volume()
  }
 
  setVolume(volume: number) {
    Howler.volume(volume)
  }
 
  pauseAudio() {
    this.sound.pause()
  }
 
  playAudio() {
    this.sound.play()
  }
}
