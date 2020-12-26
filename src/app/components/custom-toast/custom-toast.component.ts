import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component } from '@angular/core';

import { Toast, ToastrService, ToastPackage, IndividualConfig} from 'ngx-toastr';

export interface IToastButton {
  id: string;
  title: string;
};

@Component({
  selector: '[custom-toast-component]',
  styleUrls: [`./custom-toast.component.css`],
  templateUrl: `./custom-toast.component.html`,
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('inactive => active', [
        style({ opacity:0,transform: 'translateY(100%)' }),
        animate('400ms ease-out')
      ]),
      transition('active => removed', [
        animate('400ms ease-out', style({ opacity:0,transform: 'translateY(100%)' }))
      ])
    ]),
  ],
  preserveWhitespaces: false,
})
export class CustomToastComponent extends Toast {
  // used for demo purposes
  undoString = 'undo';

  // constructor is only necessary when not using AoT
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }
}