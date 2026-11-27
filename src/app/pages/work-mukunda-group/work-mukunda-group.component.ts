import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-work-mukunda-group',
  standalone: true,
  templateUrl: './work-mukunda-group.component.html',
  styleUrl: './work-mukunda-group.component.scss',
})
export class WorkMukundaGroupComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/work-mukunda-group',
      title: "Mukunda Group: Logo, Brand System & Plot Portfolio | Phian",
      description: "Group logo redesign, brand palette and plotted project portfolio for Mukunda Group, spanning transport, logistics, steel and real estate in Nagpur.",
      image: '/assets/images/home-mukunda.jpg',
      imageWidth: 1670,
      imageHeight: 942,
      noindex: false,
      ld: null,
    });
  }
}
