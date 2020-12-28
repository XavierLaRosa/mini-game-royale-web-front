import { Injectable } from '@angular/core';
import {Howl, Howler} from 'howler';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  sound = new Howl({
    src: [
      '../../assets/mp3/What-if-a-Day-harp/What-if-a-Day.mp3'
    ]
  })
  volume: number = 0.10
  isPaused: boolean = false
  isMuted: boolean = false

  constructor() { }

  start() {
    console.log("playing")
    // Play the sound.
    this.sound.play()
    this.sound.loop(true)

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
    this.isPaused = true
  }
 
  playAudio() {
    this.sound.play()
    this.isPaused = false
    Howler.volume(this.volume);
  }

  stopAudio() {
    this.sound.stop()
    this.isPaused = true
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    console.log("detected change: ", this.isMuted)
    this.sound.mute(this.isMuted)
  }

  seekAudio() {
    this.sound.seek()
  }
}
