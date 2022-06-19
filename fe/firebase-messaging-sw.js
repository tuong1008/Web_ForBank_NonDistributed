if ("function" === typeof importScripts) {
  const firebaseVersion = "8.9.1";

  importScripts(
    "https://www.gstatic.com/firebasejs/" + firebaseVersion + "/firebase-app.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/" +
      firebaseVersion +
      "/firebase-messaging.js"
  );

  addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

  // addEventListener("message", onMessage);

  // function onMessage(e) {
  //   // do some work here
  // }

  // Initialize the Firebase app in the service worker by passing in the
  // messagingSenderId.
  const firebaseConfig = {
    apiKey: "AIzaSyDjx4R2KHZYGbp8b8rL7Oe8lpRl-rKlw0w",
    authDomain: "bank-75e3c.firebaseapp.com",
    projectId: "bank-75e3c",
    storageBucket: "bank-75e3c.appspot.com",
    messagingSenderId: "917260150782",
    appId: "1:917260150782:web:15519f4a3404a8759342af",
    measurementId: "G-3VTKJ75XDS",
  };

  firebase.initializeApp(firebaseConfig);

  // Retrieve an instance of Firebase Messaging so that it can handle background messages.
  const messaging = firebase.messaging();

  messaging
    .getToken({
      vapidKey:
        "BNI2VHGLrARhaSbTbP1ya8-0WKW298crx9gTxF73jWTZyUFtThQGhFHqy7lxEGPB_CwU8eXipCWxlrgcBXFF5AA",
    })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken);
        self.clients.matchAll().then(function (clients){
          console.log(clients);
          clients.forEach(function(client){
              console.log("gui message");
              client.postMessage(currentToken);
          });
      }); 
        // ...
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });

    // messaging.onBackgroundMessage((payload) => {
    //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
    //   // Customize notification here
    //   const notificationTitle = 'Background Message Title';
    //   const notificationOptions = {
    //     body: 'Background Message body.',
    //     icon: '/firebase-logo.png'
    //   };
    
    //   self.registration.showNotification(notificationTitle,
    //     notificationOptions);
    // });    
}
