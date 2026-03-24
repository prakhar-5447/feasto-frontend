import { Component, Output, EventEmitter, Inject, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLocationDot, faLocationCrosshairs, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocationService, LocationServicePersistence } from '../../../core/services/location.service';
import { ClickOutsideDirective } from "../../directive/clickOutside.directive";
import { Router } from '@angular/router';
import { selectUser } from '../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state'; // ✅ add this
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ClickOutsideDirective, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass',
})
export class Navbar {
  private store = inject(Store<AppState>);

  user$: Observable<any> = this.store.select(selectUser);
  constructor(private http: HttpClient, private router: Router, private locationService: LocationService, private locationServicePersistence: LocationServicePersistence) { }

  @Output() openAuth = new EventEmitter<void>();
  faLocationDot = faLocationDot;
  faLocationCrosshairs = faLocationCrosshairs;
  faMagnifyingGlass = faMagnifyingGlass;

  selectedLocation: string = 'Select Location';
  locationQuery = '';
  locationResults: any[] = [];
  showLocationDropdown = false;
  showRestaurantDropdown = false;

  restaurantQuery = '';
  restaurantResults: any[] = [];

  ngOnInit() {
    this.locationServicePersistence.city$.subscribe(city => {
      this.selectedLocation = this.toTitleCase(city);
    })
  }

  toTitleCase(value: string | null): string {
    if (!value) return ""
    return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  closeDropdown() {
    this.showLocationDropdown = false;
    this.showRestaurantDropdown = false;
    this.restaurantQuery = ''
  }

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
    this.locationServicePersistence.setCity(item.text)
    this.router.navigate(['india', item.text.toLowerCase()], {
      replaceUrl: true
    })
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