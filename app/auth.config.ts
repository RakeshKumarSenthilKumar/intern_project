import {
  withEnabledBlockingInitialNavigation,
  withDisabledInitialNavigation,
} from '@angular/router';
import {
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  LogLevel,
  IPublicClientApplication,
  PublicClientApplication,
  BrowserCacheLocation,
  InteractionType,
  BrowserUtils,
} from '@azure/msal-browser';
import { environment } from '../environments/environment.development';

// export function loggerCallback(logLevel: LogLevel, message: string) {
//   console.log(message);
// }

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.msalConfig.auth.authority,
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        // loggerCallback,
        logLevel: environment.production ? LogLevel.Error : LogLevel.Verbose,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, string[]>();
  protectedResourceMap.set(
    environment.apiConfig.microsoftGraphUri.uri,
    environment.apiConfig.microsoftGraphUri.scopes,
  );

  protectedResourceMap.set(
    environment.apiConfig.glasswallApi.uri,
    environment.apiConfig.glasswallApi.scopes,
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.msalConfig.scopes],
    },
    loginFailedRoute: '/login-failed',
  };
}

export const initialNavigation =
  !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
    ? withEnabledBlockingInitialNavigation() // Set to enabledBlocking to use Angular Universal
    : withDisabledInitialNavigation();
