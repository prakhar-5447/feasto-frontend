import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.sass',
})
export class DashboardLayout { }
