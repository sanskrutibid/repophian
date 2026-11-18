import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-case-study',
  standalone: true,
  templateUrl: './case-study.component.html',
  styleUrl: './case-study.component.scss',
})
export class CaseStudyComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/case-study',
      title: "Case Studies | Phian Work",
      description: "Phian case studies: how content strategy turned everyday concerns and local development into clear understanding for Mediskin and Mukunda.",
      noindex: false,
      ld: null,
    });
  }
}
