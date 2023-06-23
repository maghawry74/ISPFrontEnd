import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Animate } from './animate';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [Animate],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  title = 'ISP';
}
