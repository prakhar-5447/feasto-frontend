import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationServicePersistence } from './core/services/location.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('feasto-frontend');
  constructor(private locationService: LocationServicePersistence) { }

  ngOnInit() {
    this.locationService.loadInitialCity()
  }
}
