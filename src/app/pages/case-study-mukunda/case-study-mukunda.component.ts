import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-case-study-mukunda',
  standalone: true,
  templateUrl: './case-study-mukunda.component.html',
  styleUrl: './case-study-mukunda.component.scss',
})
export class CaseStudyMukundaComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/case-study/mukunda',
      title: "Mukunda Nagpur Real Estate Content Strategy Case Study | Phian",
      description: "Content strategy that connected Nagpur infrastructure and growth with property decisions, and built a steady lead pipeline for Mukunda.",
      image: '/assets/images/work-mukunda-nagpur.jpg',
      imageWidth: 1376,
      imageHeight: 774,
      noindex: false,
      ld: null,
    });
  }
}
