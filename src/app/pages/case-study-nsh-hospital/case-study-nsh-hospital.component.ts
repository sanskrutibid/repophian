import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-case-study-nsh-hospital',
  standalone: true,
  templateUrl: './case-study-nsh-hospital.component.html',
  styleUrl: './case-study-nsh-hospital.component.scss',
})
export class CaseStudyNshHospitalComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/case-study/nsh-hospital',
      title: "NSH Breast Cancer Awareness Campaign Case Study | Phian",
      description: "How doctor-led content and screening education turned breast cancer awareness into an everyday social media conversation for NSH Hospital.",
      image: '/assets/images/case-study-nsh-hospital.jpg',
      imageWidth: 1920,
      imageHeight: 1080,
      noindex: false,
      ld: null,
    });
  }
}
