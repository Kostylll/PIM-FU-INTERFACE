import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fadeAnimation } from './app.animation';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations:[fadeAnimation]
})
export class AppComponent {
  title = 'personal-project';

  routeAnimationState: string;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.routeAnimationState = this.routeAnimationState === 'fade-in' ? 'fade-out' : 'fade-in';
    });
  }

  getRouteAnimationState() {
    return this.routeAnimationState;
  }
}
