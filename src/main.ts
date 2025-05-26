import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { AuthService } from './app/core/services/auth.service';

function initializeApp(authService: AuthService): () => Promise<void> {
  return () => authService.initAuth();
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true
    }
  ]
}).catch((err) => console.error(err));
