import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass, faLocationDot, faClock,
  faUtensils,
  faMotorcycle,
  faStar, faCreditCard, faBox,
  faMobileScreen,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('feasto-frontend');

  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;
  faClock = faClock;
  faUtensils = faUtensils;
  faMotorcycle = faMotorcycle;
  faStar = faStar;
  faMobile = faMobileScreen;
  faDownload = faDownload;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faYoutube = faYoutube;

  features = [
    {
      icon: faClock,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less'
    },
    {
      icon: faUtensils,
      title: 'Wide Selection',
      description: 'Choose from thousands of restaurants and cuisines'
    },
    {
      icon: faMotorcycle,
      title: 'Track Order',
      description: 'Real-time tracking of your order from kitchen to doorstep'
    },
    {
      icon: faStar,
      title: 'Best Quality',
      description: 'Only verified restaurants with highest ratings'
    }
  ];

  cuisines = [
    {
      name: "Pizza",
      image: "https://images.unsplash.com/photo-1559978137-8c560d91e9e1",
      restaurants: "150+ restaurants"
    },
    {
      name: "Burgers",
      image: "https://images.unsplash.com/photo-1651843465180-5965076f7368",
      restaurants: "120+ restaurants"
    },
    {
      name: "Asian",
      image: "https://images.unsplash.com/photo-1652937916838-09b9c2ff8b45",
      restaurants: "200+ restaurants"
    },
    {
      name: "Healthy",
      image: "https://images.unsplash.com/photo-1654458804670-2f4f26ab3154",
      restaurants: "80+ restaurants"
    },
    {
      name: "Desserts",
      image: "https://images.unsplash.com/photo-1759426016293-1b8be5849a72",
      restaurants: "100+ restaurants"
    }
  ];

  steps = [
    {
      icon: faLocationDot,
      title: "Select Location",
      description: "Enter your delivery address to discover nearby restaurants",
      step: "01"
    },
    {
      icon: faMagnifyingGlass,
      title: "Choose Restaurant",
      description: "Browse through menus and select your favorite dishes",
      step: "02"
    },
    {
      icon: faCreditCard,
      title: "Pay Online",
      description: "Secure payment with multiple payment options",
      step: "03"
    },
    {
      icon: faBox,
      title: "Enjoy Your Meal",
      description: "Get your food delivered hot and fresh to your doorstep",
      step: "04"
    }
  ]
}
