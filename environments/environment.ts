export const environment = {
  production: true,
  apiConfig: {
    microsoftGraphUri: {
      uri: 'https://graph.microsoft.com/',
      scopes: ['user.read'],
    },
    glasswallApi: {
      uri: 'http://localhost:5141/',
      scopes: ['api://glasswall-api/access-as-user'],
    },
  },
  msalConfig: {
    auth: {
      clientId: '5c4fb191-87f1-4118-aa9b-6486782246eb',
      authority:
        'https://login.microsoftonline.com/832ebef3-7cc8-484d-90fa-3a367f861f4c/oauth2/authorize',
    },
    scopes: [
      'api://glasswall-api/access-as-user',
      'profile',
      'email',
      'user.read',
    ],
    cache: {
      cacheLocation: 'localStorage',
    },
  },
};
