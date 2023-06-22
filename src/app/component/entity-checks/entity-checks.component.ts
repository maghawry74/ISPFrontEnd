import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-entity-checks',
  templateUrl: './entity-checks.component.html',
  styleUrls: ['./entity-checks.component.css'],
})
export class EntityChecksComponent {
  @Input() entity = '';
  @Input() fromGroup = new FormGroup({});
}
