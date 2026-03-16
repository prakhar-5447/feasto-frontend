import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LocationService {

  constructor(private http: HttpClient) { }

  search(query: string) {
    return this.http.get(`/api/location-search?q=${query}`);
  }

  reverseGeocode(lat: number, lng: number) {
    return this.http.get(`/api/location/reverse?lat=${lat}&lng=${lng}`);
  }
}