import firebase from 'firebase';

export const initializeFirebase = () => {
  
  firebase.initializeApp({
    messagingSenderId: '311354112482' // troque pelo seu sender id 
  });
  

  // use other service worker
  // navigator.serviceWorker
  //   .register('/my-sw.js')
  //   .then((registration) => {
  //     firebase.messaging().useServiceWorker(registration);
  //   });
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();

     messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);

    return token;
  } catch (error) {
    console.error(error);
  }
};
