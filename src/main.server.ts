import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// Angular >= 18.2.14 requires the server BootstrapContext to be forwarded,
// otherwise prerender fails with "NG0210 / document is not defined".
const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
