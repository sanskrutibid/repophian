import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-case-study-iit-home',
  standalone: true,
  templateUrl: './case-study-iit-home.component.html',
  styleUrl: './case-study-iit-home.component.scss',
})
export class CaseStudyIitHomeComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/case-study/iit-home',
      title: "IIT-Home Case Study | Phian Work",
      description: "A content-led approach bringing academic preparation, student ambition and True Education into one consistent digital voice, for IIT-Home.",
      noindex: false,
      ld: null,
    });
  }
}
