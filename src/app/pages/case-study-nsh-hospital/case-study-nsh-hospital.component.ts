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
      title: "NSH Hospital Case Study | Phian Work",
      description: "How clear, doctor-led communication turned breast cancer awareness and screening education into an everyday digital conversation for NSH Hospital.",
      noindex: false,
      ld: null,
    });
  }
}
