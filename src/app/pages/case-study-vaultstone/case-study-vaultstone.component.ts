import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-case-study-vaultstone',
  standalone: true,
  templateUrl: './case-study-vaultstone.component.html',
  styleUrl: './case-study-vaultstone.component.scss',
})
export class CaseStudyVaultstoneComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/case-study/vaultstone',
      title: "Vaultstone Case Study | Phian Work",
      description: "A content-led approach to making commercial property conversations easier to understand, for Vaultstone.",
      image: '/assets/images/case-study-vaultstone.jpg',
      imageWidth: 1920,
      imageHeight: 1080,
      noindex: false,
      ld: null,
    });
  }
}
