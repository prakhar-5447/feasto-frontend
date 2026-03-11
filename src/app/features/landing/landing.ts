import { Component } from '@angular/core';
import { Hero } from "./hero/hero";
import { WhyChooseFeasto } from "./why-choose-feasto/why-choose-feasto";
import { Cuisines } from "./cuisines/cuisines";
import { HowItWorks } from "./how-it-works/how-it-works";
import { AppPromotion } from "./app-promotion/app-promotion";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Hero, WhyChooseFeasto, Cuisines, HowItWorks, AppPromotion],
  templateUrl: './landing.html',
  styleUrl: './landing.sass',
})
export class Landing { }
