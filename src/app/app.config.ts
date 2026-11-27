import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // NO provideClientHydration(): the page effects (marquees, video, counters, text animations) edit the DOM by hand, which clashes with
    // hydration on a full page load / hard refresh (marquee repeated, showreel not playing). Without hydration the browser starts the app
    // fresh, exactly as before prerendering was added. The prerendered HTML is still what Google and other crawlers read.
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'disabled', anchorScrolling: 'enabled' })),
  ],
};
