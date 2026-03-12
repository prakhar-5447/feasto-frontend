import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../features/auth/auth';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, Auth],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.sass',
})
export class AuthLayout {
  faArrowLeft = faArrowLeft
}
