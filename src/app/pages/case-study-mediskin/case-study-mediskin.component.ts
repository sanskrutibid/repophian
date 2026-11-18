import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-case-study-mediskin',
  standalone: true,
  templateUrl: './case-study-mediskin.component.html',
  styleUrl: './case-study-mediskin.component.scss',
})
export class CaseStudyMediskinComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/case-study/mediskin',
      title: "Mediskin Case Study | Phian Work",
      description: "A content-led approach to skin and hair awareness for Mediskin: simple, visual, educational communication on everyday concerns.",
      noindex: false,
      ld: null,
    });
  }
}
