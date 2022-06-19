import AbstractView from "./AbstractView.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

import {
  getMessaging,
  onMessage,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-messaging.js";

// import { getToken } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-messaging.js";
// import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-messaging-sw.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Đăng nhập Khách hàng");
  }

  firebaseConfig = {
    apiKey: "AIzaSyDjx4R2KHZYGbp8b8rL7Oe8lpRl-rKlw0w",
    authDomain: "bank-75e3c.firebaseapp.com",
    projectId: "bank-75e3c",
    storageBucket: "bank-75e3c.appspot.com",
    messagingSenderId: "917260150782",
    appId: "1:917260150782:web:15519f4a3404a8759342af",
    measurementId: "G-3VTKJ75XDS",
  };
  app = initializeApp(this.firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(this.app);

  provider = new GoogleAuthProvider();

  setEventLogin(callback) {
    const auth = this.auth;
    //login de co cookie
    document
      .getElementById("loginBtn")
      .addEventListener("click", function (event) {
        event.preventDefault();
        let url = "http://localhost:8080/web_forbank/api-user-login";
        fetch(url, {
          credentials: "include",
          headers: {
            user: "adminCN1",
            password: "Admin1234.",
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then((success) => {
            console.log(success);
          })
          .catch((err) => {
            //login fail, show message error that return by json
            document.getElementById("errorMsg").innerHTML =
              "Sai tài khoản hoặc mật khẩu";
          });
        //sau khi lay cookie xong
        let formLogin = document.getElementById("formLogin");
        let formData = new FormData(formLogin);
        console.log(formData.get("taiKhoan"));
        console.log(formData.get("matKhau"));
        var object = {};
        formData.forEach(function (value, key) {
          object[key] = value;
        });
        object["matKhau"] = "";
        signInWithEmailAndPassword(
          auth,
          formData.get("taiKhoan"),
          formData.get("matKhau")
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            let url = "http://localhost:8080/web_forbank/user-login";
            fetch(url, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(object),
            })
              .then(function (response) {
                return response.json();
              })
              .then((success) => {
                console.log(success);
                // lưu thông tin user
                localStorage.setItem("userId", success.id);
                localStorage.setItem("imageUrl", success.imageUrl);
                localStorage.setItem("khachHangID", success.khachHangID);
                localStorage.setItem("phanQuyen", "khachHang");

                //update firebase token
                fetch(
                  "http://localhost:8080/web_forbank/user-account?action=updateFirebaseToken",
                  {
                    method: "PUT",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      firebaseToken: localStorage.getItem("fbToken"),
                      userId: localStorage.getItem("userId"),
                    }),
                  }
                )
                  .then(function (response) {
                    return response.json();
                  })
                  .then((result) => {
                    console.log(result);
                    if (result.message.includes("thành công")) {
                      fetch(
                        `http://localhost:8080/web_forbank/api-tk?cmnd=${localStorage.getItem(
                          "khachHangID"
                        )}`,
                        { credentials: "include" }
                      )
                        .then(function (response) {
                          return response.json();
                        })
                        .then(function (allTK) {
                          console.log(allTK);
                          localStorage.setItem("soTK", allTK[0].soTK);
                          localStorage.setItem("soDu", allTK[0].soDu);
                          callback();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } else {
                      document.getElementById("errorMsg").innerHTML =
                        result.message;
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                // document.getElementById("nav_item_login").hidden = true;
                // document.getElementById("nav_item_logout").hidden = false;

                // let navItemUpdate = document.getElementById("nav_item_update");
                // navItemUpdate.hidden = false;
                // navItemUpdate.href = `/employeeUpdate/${success.userName}`;

                // document.getElementById("nav_item_change_pass").hidden = false;
              })
              .catch((err) => {
                //login fail, show message error that return by json
                document.getElementById("errorMsg").innerHTML =
                  "Sai tài khoản hoặc mật khẩu";
                console.error(err);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            // ..
          });
      });
    // ...
  }

  setEventLoginWithGoogle(callback, fail) {
    const firebaseAuth = this.auth;
    const firebaseProvider = this.provider;
    const loadTK = this.loadTK;
    document
      .getElementById("loginWithGoogle")
      .addEventListener("click", function (event) {
        event.preventDefault();
        //lấy cookie
        let url = "http://localhost:8080/web_forbank/api-user-login";
        fetch(url, {
          credentials: "include",
          headers: {
            user: "adminCN1",
            password: "Admin1234.",
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then((success) => {
            console.log(success);
          })
          .catch((err) => {
            //login fail, show message error that return by json
            document.getElementById("errorMsg").innerHTML =
              "Sai tài khoản hoặc mật khẩu";
          });
        signInWithPopup(firebaseAuth, firebaseProvider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            fetch(
              "http://localhost:8080/web_forbank/user-login?verifiedBy=google",
              {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taiKhoan: user.email }),
              }
            )
              .then(function (response) {
                return response.json();
              })
              .then((success) => {
                console.log(success);
                if (success == null){
                  let hoTen = user.displayName;
                  let ho = hoTen.substring(0,hoTen.lastIndexOf(' '));
                  let ten = hoTen.substring(hoTen.lastIndexOf(' ')+1);

                  localStorage.setItem("imageUrl", user.photoURL);
                  fail(user.email, ho, ten); 
                  return;
                }
                
                // lưu thông tin user
                localStorage.setItem("userId", success.id);
                localStorage.setItem("imageUrl", success.imageUrl);
                localStorage.setItem("khachHangID", success.khachHangID);
                localStorage.setItem("phanQuyen", "khachHang");

                //update firebase token
                fetch(
                  "http://localhost:8080/web_forbank/user-account?action=updateFirebaseToken",
                  {
                    method: "PUT",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      firebaseToken: localStorage.getItem("fbToken"),
                      userId: localStorage.getItem("userId"),
                    }),
                  }
                )
                  .then(function (response) {
                    return response.json();
                  })
                  .then((result) => {
                    console.log(result);
                    if (result.message.includes("thành công")) {
                      fetch(
                        `http://localhost:8080/web_forbank/api-tk?cmnd=${localStorage.getItem(
                          "khachHangID"
                        )}`,
                        { credentials: "include" }
                      )
                        .then(function (response) {
                          return response.json();
                        })
                        .then(function (allTK) {
                          console.log(allTK);
                          localStorage.setItem("soTK", allTK[0].soTK);
                          localStorage.setItem("soDu", allTK[0].soDu);
                          callback();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } else {
                      document.getElementById("errorMsg").innerHTML =
                        result.message;
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      });
  }

  setNotificationEvent() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });
  }

  // testMessaging(){
  //   const messaging = getMessaging();
  //   console.log(messaging);
  //   getToken(messaging, { vapidKey: "BNI2VHGLrARhaSbTbP1ya8-0WKW298crx9gTxF73jWTZyUFtThQGhFHqy7lxEGPB_CwU8eXipCWxlrgcBXFF5AA" })
  //  .then((currentToken) => {
  //   if (currentToken) {
  //     // Send the token to your server and update the UI if necessary
  //     console.log(currentToken);
  //     // ...
  //   } else {
  //     // Show permission request UI
  //     console.log('No registration token available. Request permission to generate one.');
  //     // ...
  //   }
  // }).catch((err) => {
  //   console.log('An error occurred while retrieving token. ', err);
  //   // ...
  // });

  // onBackgroundMessage(messaging, (payload) => {
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

  // }

  getHtml() {
    return `
        <h2 id="errorMsg"></h2>
        <form id="formLogin" name="formLogin">
            <div class="form-group">
                <input type="text" class="form-control" id="taiKhoan" name="taiKhoan"
                    placeholder="Email">
            </div>

            <div class="form-group">
                <input type="password" class="form-control" id="matKhau" name="matKhau"
                    placeholder="Mật khẩu">
            </div>
            <div class="form-group">
                <a aria-current="page" href="/forgot-password" data-link>Quên Mật Khẩu</a>
            </div>
            <button id="loginWithGoogle" class="btn btn-primary">Đăng nhập với Google</button>
            <button id="loginBtn" class="btn btn-primary">Đăng nhập</button>

            <div class="form-group">
                <p>Bạn chưa có tài khoản?</p>
            </div>
            <div class="form-group">
                <a aria-current="page" href="/signup" data-link>Đăng ký</a>
            </div>
        </form>`;
  }
}
