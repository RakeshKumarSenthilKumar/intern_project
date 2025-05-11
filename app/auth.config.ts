import {
  withEnabledBlockingInitialNavigation as enableInitialNav,
  withDisabledInitialNavigation as disableInitialNav,
} from '@angular/router';
import {
  MsalInterceptorConfiguration as AuthInterceptorConfig,
  MsalGuardConfiguration as AuthGuardConfig,
} from '@azure/msal-angular';
import {
  LogLevel as LogSeverity,
  IPublicClientApplication as IAuthClient,
  PublicClientApplication as AuthClient,
  BrowserCacheLocation as CacheStore,
  InteractionType as AuthInteraction,
  BrowserUtils as BrowserHelper,
} from '@azure/msal-browser';
import { environment } from '../environments/environment.development';

// export function customLogger(level: LogSeverity, msg: string) {
//   console.log(msg);
// }

export function createAuthClient(): IAuthClient {
  return new AuthClient({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.msalConfig.auth.authority,
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: CacheStore.LocalStorage,
    },
    system: {
      allowNativeBroker: false,
      loggerOptions: {
        // loggerCallback: customLogger,
        logLevel: environment.production ? LogSeverity.Error : LogSeverity.Verbose,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function createInterceptorConfig(): AuthInterceptorConfig {
  const apiScopesMap = new Map<string, string[]>();

  apiScopesMap.set(
    environment.apiConfig.microsoftGraphUri.uri,
    environment.apiConfig.microsoftGraphUri.scopes,
  );

  apiScopesMap.set(
    environment.apiConfig.glasswallApi.uri,
    environment.apiConfig.glasswallApi.scopes,
  );

  return {
    interactionType: AuthInteraction.Redirect,
    protectedResourceMap: apiScopesMap,
  };
}

export function createGuardConfig(): AuthGuardConfig {
  return {
    interactionType: AuthInteraction.Redirect,
    authRequest: {
      scopes: [...environment.msalConfig.scopes],
    },
    loginFailedRoute: '/login-failure',
  };
}

export const startupNavigation =
  !BrowserHelper.isInIframe() && !BrowserHelper.isInPopup()
    ? enableInitialNav()
    : disableInitialNav();
