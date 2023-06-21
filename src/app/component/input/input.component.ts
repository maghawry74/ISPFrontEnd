import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() id = '';
  @Input() type = '';
  @Input() control: FormControl = new FormControl();
  @Input() placeHolder = '';
  @Input() label = 'Label';
  @Input() isShown = true;
  @Output() Onchecked = new EventEmitter<boolean>();

  changeHandler(e: HTMLInputElement) {
    this.Onchecked.emit(e.checked);
  }
}
