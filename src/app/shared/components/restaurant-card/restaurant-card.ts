import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.sass',
})
export class RestaurantCard {
  @Input() restaurant: any; 
}
