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
      title: "Mukunda Case Study | Phian Work",
      description: "Content strategy connecting Nagpur's infrastructure and development story with property decisions, for Mukunda.",
      noindex: false,
      ld: null,
    });
  }
}
