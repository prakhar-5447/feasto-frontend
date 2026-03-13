import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../shared/components/footer/footer";
import { Modal } from "../../shared/components/modal/modal";
import { Auth } from "../../features/auth/auth";

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [Navbar, RouterOutlet, Footer, Modal, Auth],
  templateUrl: './landing-layout.html',
  styleUrl: './landing-layout.sass',
})
export class LandingLayout {

  showAuthModal = false;

  openAuth() {
    this.showAuthModal = true;
  }

  closeAuth() {
    this.showAuthModal = false;
  }
}
