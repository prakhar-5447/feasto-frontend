import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-landing-layout',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './landing-layout.html',
  styleUrl: './landing-layout.sass',
})
export class LandingLayout { }
