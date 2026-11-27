import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/about',
      title: "About Phian | 360-Degree Brand Management Company, Nagpur and Kolkata",
      description: "Learn about Phian: our vision, what we believe, and how we build, run and grow brands.",
      noindex: false,
      ld: null,
    });
  }
}
