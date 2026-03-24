import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.sass',
})
export class Breadcrumb {
  breadcrumbs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.route.root);
      });
    this.breadcrumbs = this.buildBreadcrumb(this.route.root);
  }

  buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
    const child = route.firstChild;
    let routeURL = child?.snapshot.url.map(segment => segment.path).join('/');

    if (!child) return breadcrumbs;

    if (routeURL === '') return breadcrumbs;
    if (routeURL) url += `/${routeURL}`;

    let label = child.snapshot.data['breadcrumb'];

    // 🔥 Replace dynamic params
    if (label === 'city') {
      label = child.snapshot.params['city'];
    }
    if (label === 'restaurant') {
      label = child.snapshot.params['restaurant'];
    }

    label = label.split('-')
      .filter(Boolean)
      .map((word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ")
    if (label) {
      breadcrumbs.push({ label, url });
    }

    return this.buildBreadcrumb(child, url, breadcrumbs);
  }

}
