import { Component, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLocationDot, faLocationCrosshairs, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../../../core/services/location.service';

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

  selectedLocation = 'Select Location';
  locationQuery = '';
  locationResults: any[] = [];
  showLocationDropdown = false;
  showRestaurantDropdown = false;

  restaurantQuery = '';
  restaurantResults: any[] = [];

  constructor(private http: HttpClient, private locationService: LocationService) { }

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

    this.locationService.search(this.locationQuery)
      .subscribe((data: any) => {
        this.locationResults = data;
      });
  }

  selectLocation(item: any) {
    this.selectedLocation = item.place_name;
    this.locationResults = [];
    this.showLocationDropdown = false;
    this.locationQuery = '';
  }

  detectLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.locationService
          .reverseGeocode(latitude, longitude)
          .subscribe((data: any) => {
            this.selectedLocation = data.place_name;
          });
      },
      error => {
        console.error(error);
        alert('Location permission denied');
      }
    );
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