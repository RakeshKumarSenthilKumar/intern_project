import { bootstrapApplication } from '@angular/platform-browser';
import { secureAppConfig } from './secure-app/secure-app.config';
import { SecureAppComponent } from './secure-app/secure-app.component';

bootstrapApplication(SecureAppComponent, secureAppConfig).catch((error) =>
  console.error(error),
);
