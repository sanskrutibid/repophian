import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-mumbai',
  standalone: true,
  templateUrl: './mumbai.component.html',
  styleUrl: './mumbai.component.scss',
})
export class MumbaiComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/mumbai',
      title: "Branding and Marketing Agency for Mumbai Brands | Phian Infotec",
      description: "Phian Infotec's Mumbai contact address. Our Nagpur and Kolkata teams plan brand strategy, content, media, web and search for businesses across Mumbai and Western India.",
      noindex: false,
      ld: null,
    });
  }
}
