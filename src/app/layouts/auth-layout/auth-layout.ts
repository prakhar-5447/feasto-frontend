import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, RouterLink],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.sass',
})
export class AuthLayout {
  faArrowLeft = faArrowLeft
}
