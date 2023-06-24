import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Animate } from './animate';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [Animate],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  title = 'ISP';
  showSideNav = false;
  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const { url } = event as { url: string };
        console.log(url);
        this.showSideNav = !(url == '/Login');
      });
  }
}
