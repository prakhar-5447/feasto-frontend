import { Component, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLocationDot, faLocationCrosshairs, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass',
})
export class Navbar {
  @Output() openAuth = new EventEmitter<void>();
  faLocationDot = faLocationDot;
  faLocationCrosshairs = faLocationCrosshairs;
  faMagnifyingGlass = faMagnifyingGlass;
  mapboxToken = environment.mapboxToken;

  selectedLocation = 'Select Location';
  locationQuery = '';
  locationResults: any[] = [];
  showLocationDropdown = false;
  showRestaurantDropdown = false;

  restaurantQuery = '';
  restaurantResults: any[] = [];

  constructor(private http: HttpClient) { }

  toggleLocationDropdown() {
    this.showRestaurantDropdown = false;
    this.showLocationDropdown = !this.showLocationDropdown;
  }

  toggleRestaurantDropdown() {
    this.showLocationDropdown = false;
    this.showRestaurantDropdown = !this.showRestaurantDropdown;
  }

  searchLocation() {

    if (!this.locationQuery) {
      this.locationResults = [];
      return;
    }

    const url =
      `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
      `${this.locationQuery}.json?access_token=${this.mapboxToken}&limit=5&country=in`;

    this.http.get<any>(url).subscribe(res => {
      this.locationResults = res.features;
    });
  }

  selectLocation(item: any) {
    this.selectedLocation = item.place_name;
    this.locationResults = [];
    this.showLocationDropdown = false;
    this.locationQuery = '';
  }

  detectLocation() {

    navigator.geolocation.getCurrentPosition(position => {

      const { latitude, longitude } = position.coords;

      const url =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
        `${longitude},${latitude}.json?access_token=${this.mapboxToken}`;

      this.http.get<any>(url).subscribe(res => {
        this.selectedLocation = res.features[0].place_name;
      });

    });

  }

  searchRestaurant() {

    if (!this.restaurantQuery) {
      this.restaurantResults = [];
      return;
    }

    // Replace with your API later
    this.restaurantResults = [
      { name: 'Dominos Pizza' },
      { name: 'Burger King' },
      { name: 'KFC' },
      { name: 'Subway' }
    ].filter(r =>
      r.name.toLowerCase().includes(this.restaurantQuery.toLowerCase())
    );

    this.showRestaurantDropdown = true;
  }

  selectRestaurant(res: any) {
    this.restaurantQuery = res.name;
    this.restaurantResults = [];
    this.showRestaurantDropdown = false;
  }
}