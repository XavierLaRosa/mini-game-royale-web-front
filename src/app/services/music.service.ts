import { Injectable } from '@angular/core';
import {Howl, Howler} from 'howler';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  volume: number = 0.00
  isPaused: boolean = false
  isMuted: boolean = false
  songs: string[] = [
    '../../assets/mp3/new-light.mp3',
    '../../assets/mp3/stayin-alive.mp3',
    '../../assets/mp3/santa-tell-me.mp3',
    '../../assets/mp3/plastic-love.mp3',
    '../../assets/mp3/last-christmas.mp3',
    '../../assets/mp3/get-lucky.mp3',
    '../../assets/mp3/all-i-want-for-christmas-is-you.mp3',
  ]
  sound = new Howl({
    src: this.songs,
    loop: true,
    autoplay: true
  })

  constructor() { }

  start() {
    console.log("playing")
    // Change global volume.
    Howler.volume(this.volume);
    // Play the sound.
    this.sound.play()


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

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}
