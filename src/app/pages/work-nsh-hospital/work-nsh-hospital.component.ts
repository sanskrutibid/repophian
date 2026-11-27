import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-work-nsh-hospital',
  standalone: true,
  templateUrl: './work-nsh-hospital.component.html',
  styleUrl: './work-nsh-hospital.component.scss',
})
export class WorkNshHospitalComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/work-nsh-hospital',
      title: "NSH Hospital: PR, Branding & Digital Marketing | Phian",
      description: "Positioning, branding, PR and digital marketing for NSH Critical Care Hospital and Diagnostic Centre, Nagpur. One plan across every channel.",
      image: '/assets/images/work-nsh.jpg',
      imageWidth: 1376,
      imageHeight: 768,
      noindex: false,
      ld: null,
    });
  }
}
