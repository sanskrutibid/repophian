import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { ENQUIRY_ENDPOINT, ENQUIRY_EMAIL } from '../../core/site.config';
import { CLIENT_GROUPS, HOME_TOP } from '../../core/clients.data';
import { BrandLogoComponent } from '../../shared/brand-logo/brand-logo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BrandLogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  groups = CLIENT_GROUPS;
  /** Our clients: top 5 of every group (one group per row), then the rest behind "Show more" */
  homeTop = CLIENT_GROUPS.flatMap(g => g.clients.slice(0, HOME_TOP));
  homeMore = CLIENT_GROUPS.flatMap(g => g.clients.slice(HOME_TOP));
  showAll = false;
  // Closing-band enquiry form: emailed to info@ by /enquiry.php. Success is shown only when the server confirms the mail was sent.
  eBusy = false;
  eOk = false;
  eMsg = '';
  eMail = 'mailto:' + ENQUIRY_EMAIL + '?subject=' + encodeURIComponent('Free brand review enquiry');
  eFail = false;

  async sendEnquiry(ev: Event): Promise<void> {
    ev.preventDefault();
    if (this.eBusy) return;
    const form = ev.target as HTMLFormElement;
    const d = new FormData(form);
    const name = String(d.get('name') || '').trim(), phone = String(d.get('phone') || '').trim(), biz = String(d.get('biz') || '').trim();
    this.eFail = false;
    if (!name || !biz || !/^[0-9+()\-\s]{7,20}$/.test(phone)) { this.eOk = false; this.eMsg = 'Please add your name, a valid phone number and your business name.'; return; }
    d.set('page', 'Homepage');
    this.eBusy = true; this.eMsg = '';
    try {
      const r = await fetch(ENQUIRY_ENDPOINT, { method: 'POST', body: d });
      const j = await r.json().catch(() => ({} as { ok?: boolean; error?: string }));
      if (r.ok && j.ok) { this.eOk = true; this.eMsg = 'Thank you, ' + name + '. We have your details and will call you within one working day.'; form.reset(); }
      else if (r.status === 400 || r.status === 429) { this.eOk = false; this.eMsg = j.error || 'Please check your details and try again.'; }
      else throw new Error('not delivered');
    } catch {
      this.eOk = false; this.eFail = true;
      this.eMsg = 'We could not send this online right now. Please call +91 77098 09577, WhatsApp us, or email us using the buttons below.';
    } finally { this.eBusy = false; }
  }

  muted = true;
  @ViewChild('reel') reelD?: ElementRef<HTMLVideoElement>;
  @ViewChild('frame') frameD?: ElementRef<HTMLElement>;
  @ViewChild('reelM') reelM?: ElementRef<HTMLVideoElement>;
  @ViewChild('frameM') frameM?: ElementRef<HTMLElement>;
  private io?: IntersectionObserver;
  private mq?: MediaQueryList;
  private onMq = () => this.setup();
  // Portrait phones get the 9:16 video (full width, no black sides); tablets, landscape phones, laptops and desktops get the 16:9 showreel
  private static readonly PHONE = '(max-width: 600px) and (orientation: portrait)';

  private get isPhone(): boolean { return !!this.mq?.matches; }
  private get reel(): HTMLVideoElement | undefined { return (this.isPhone ? this.reelM : this.reelD)?.nativeElement; }
  private get frame(): HTMLElement | undefined { return (this.isPhone ? this.frameM : this.frameD)?.nativeElement; }

  constructor(seo: SeoService) {
    // SEO for this page: change title / description here
    seo.set({
      path: '/',
      title: "Phian Infotec | Branding & Marketing Agency in Nagpur",
      description: "One senior team for brand strategy, content, ads, web, SEO and PR. Nagpur and Kolkata offices. Book a free brand review.",
      noindex: false,
      ld: null,
    });
  }

  // Showreel: only the video for this device is loaded (phone = 9:16, desktop = 16:9). Plays silently, pauses when scrolled away.
  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return; // prerender (Node): no video, no browser APIs
    this.mq = window.matchMedia(HomeComponent.PHONE);
    if (this.mq.addEventListener) this.mq.addEventListener('change', this.onMq); else (this.mq as any).addListener?.(this.onMq);
    this.setup();
  }

  private setup(): void {
    const on = this.reel;
    const off = (this.isPhone ? this.reelD : this.reelM)?.nativeElement;
    this.io?.disconnect();
    if (off) { off.pause(); }
    if (!on) return;
    if (!on.getAttribute('src')) { on.src = on.dataset['src'] || ''; on.preload = 'auto'; on.load(); }
    on.muted = this.muted;
    on.defaultMuted = true;
    on.setAttribute('playsinline', '');
    on.setAttribute('webkit-playsinline', '');
    const play = () => {
      if (!on.getAttribute('src')) { on.src = on.dataset['src'] || ''; on.load(); }
      on.muted = this.muted;
      const p = on.play();
      if (p && p.catch) p.catch(() => { /* autoplay blocked: retried below on canplay / first user gesture */ });
    };
    play();
    // retry whenever the browser says it can play, and on the first user gesture (some browsers/phones block autoplay until then)
    on.addEventListener('loadeddata', play);
    on.addEventListener('canplay', play);
    on.addEventListener('error', () => window.setTimeout(() => { on.load(); play(); }, 1500), { once: true });
    const gesture = () => { play(); };
    ['pointerdown', 'touchstart', 'keydown', 'scroll', 'click'].forEach(ev =>
      window.addEventListener(ev, gesture, { once: true, passive: true } as AddEventListenerOptions));
    document.addEventListener('visibilitychange', () => { if (!document.hidden && on.paused) play(); });
    window.setTimeout(() => { if (on.paused) play(); }, 1200);
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? play() : on.pause())), { threshold: 0.1 });
      this.io.observe(on);
    }
  }

  toggleSound(): void {
    const v = this.reel;
    if (!v) return;
    this.muted = !this.muted;
    v.muted = this.muted;
    if (!this.muted) v.volume = 1;
    v.play().catch(() => {});
  }

  // Full-screen button: whole video, never cropped (iPhone Safari needs its own native player call)
  fullscreen(): void {
    const v = this.reel as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | undefined;
    const f = this.frame as (HTMLElement & { webkitRequestFullscreen?: () => void }) | undefined;
    if (!v) return;
    const doc = document as Document & { webkitFullscreenElement?: Element };
    if (doc.fullscreenElement || doc.webkitFullscreenElement) { (document.exitFullscreen || (document as any).webkitExitFullscreen)?.call(document); return; }
    if (f?.requestFullscreen) { f.requestFullscreen().catch(() => v.webkitEnterFullscreen?.()); }
    else if (f?.webkitRequestFullscreen) { f.webkitRequestFullscreen(); }
    else { v.webkitEnterFullscreen?.(); }
    v.play().catch(() => {});
  }

  ngOnDestroy(): void { this.io?.disconnect(); this.mq?.removeEventListener?.('change', this.onMq); }
}
