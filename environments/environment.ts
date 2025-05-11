export const appEnv = {
  isLive: true,
  endpointSettings: {
    cloudApi: {
      baseUrl: 'https://api.newcloudservice.com/',
      accessScopes: ['user.profile.read'],
    },
    backendService: {
      baseUrl: 'http://localhost:8080/',
      accessScopes: ['api://backend-service/user-access'],
    },
  },
  authSettings: {
    authentication: {
      appId: 'abc12345-xyz6-7890-qwer-1234567890ef',
      authorityUrl:
        'https://login.newauthprovider.com/12345678-abcd-efgh-ijkl-9876543210aa/oauth2/authorize',
    },
    requestedScopes: [
      'api://backend-service/user-access',
      'profile.info',
      'email.address',
      'user.profile.read',
    ],
    cacheOptions: {
      storageMethod: 'localStorage',
    },
  },
};
