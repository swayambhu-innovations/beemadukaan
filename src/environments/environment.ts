// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    apiKey: 'AIzaSyDYoTC50N48sHyRJ0rLCLc1MhO7JSC2FJI',
    authDomain: 'beemadukaan.firebaseapp.com',
    databaseURL:'https://beemadukaan-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'beemadukaan',
    storageBucket: 'beemadukaan.appspot.com',
    messagingSenderId: '876938924830',
    appId: '1:876938924830:web:cff1e8f5ba64828a7bef0f',
    measurementId: 'G-PSCK7KKCTN',
  },
  ContentfulConfig: {
    space: 'vp56pu6guqso',
    accessToken: 'HQ3GDnjMACtX9XAU5Vq0kx6N3QT0nDPArMthFJLhBls',
    contentTypeIds: {
      product: 'post',
    },
  },
  cloudFunctions : {
    createOrder: 'http://localhost:5001/beemadukaan/us-central1/createOrder',
    capturePayment: 'http://localhost:5001/beemadukaan/us-central1/capturePayments',
  },
  RAZORPAY_KEY_ID: 'rzp_test_UHcxu4dBF7Du1Z',
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
