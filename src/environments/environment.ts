// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'beema-dukaan',
    appId: '1:107471374234:web:04d33f26d679dbffda9c23',
    storageBucket: 'beema-dukaan.appspot.com',
    apiKey: 'AIzaSyAd6BSsdMow7xMU11UEJ2k-oGd-nZ8WoBU',
    authDomain: 'beema-dukaan.firebaseapp.com',
    messagingSenderId: '107471374234',
    measurementId: 'G-8J97RDXTR1',
  },
  ContentfulConfig:{
    space: 'vp56pu6guqso',
    accessToken:
      'HQ3GDnjMACtX9XAU5Vq0kx6N3QT0nDPArMthFJLhBls',
  
    contentTypeIds: {
      product: 'post',
    },
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
