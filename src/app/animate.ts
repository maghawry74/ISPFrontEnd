import { trigger, transition, style, animate } from '@angular/animations';

export let Animate = trigger('routeAnimations', [
  transition('*<=>*', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
]);
