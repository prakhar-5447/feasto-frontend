import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass, faLocationDot
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero',
  imports: [FontAwesomeModule],
  templateUrl: './hero.html',
  styleUrl: './hero.sass',
})
export class Hero {

  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;
}
