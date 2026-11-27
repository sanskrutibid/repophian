import { Component } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-daily-creative',
  standalone: true,
  templateUrl: './daily-creative.component.html',
  styleUrl: './daily-creative.component.scss',
})
export class DailyCreativeComponent {
  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/daily-creative',
      title: "Daily Creativity | Phian Work",
      description: "Creatives from the Phian studio: posts, campaigns and ideas designed for our clients.",
      noindex: false,
      ld: null,
    });
  }
}
