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

                          document.getElementById("nav_item_login").hidden=true;
                          document.getElementById("gameNavItem").hidden=false;
                          document.getElementById("nav_item_login_client").hidden=true;
                          document.getElementById("statisticNavItem").hidden=false;

                          document.getElementById("profileNavItem").hidden=false;
                          document.getElementById("customerNavItem").hidden=true;
                          document.getElementById("accountNavItem").hidden=true;
                          document.getElementById("employeeNavItem").hidden=true;
                          document.getElementById("nav_item_logout").hidden=false;
                          document.getElementById("nav_item_change_pass").hidden=true;
                          document.getElementById("nav_item_update").hidden=true;
                          document.getElementById("tenNhom").hidden = true;
                          document.getElementById("myUser").hidden =true;
                          document.getElementById("myMaCN").hidden =true;
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
                          document.getElementById("nav_item_login").hidden=true;
                          document.getElementById("gameNavItem").hidden=false;
                          document.getElementById("nav_item_login_client").hidden=true;
                          document.getElementById("statisticNavItem").hidden=false;

                          document.getElementById("profileNavItem").hidden=false;
                          document.getElementById("customerNavItem").hidden=true;
                          document.getElementById("accountNavItem").hidden=true;
                          document.getElementById("employeeNavItem").hidden=true;
                          document.getElementById("nav_item_logout").hidden=false;
                          document.getElementById("nav_item_change_pass").hidden=true;
                          document.getElementById("nav_item_update").hidden=true;
                          document.getElementById("tenNhom").hidden = true;
                          document.getElementById("myUser").hidden =true;
                          document.getElementById("myMaCN").hidden =true;

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

  getHtml() {
    return `
<div class="d-flex align-items-center justify-content-center">
<h2 id="errorMsg"></h2>
<form id="formLogin" name="formLogin" style="width: 25rem;">
    <div class="form-outline mb-4">
        <input type="text" class="form-control" id="taiKhoan" name="taiKhoan" placeholder="Email">
    </div>

    <div class="form-outline mb-4">
        <input type="password" class="form-control" id="matKhau" name="matKhau" placeholder="Mật khẩu">
    </div>
    
    <div class="row mb-4">
        <div class="col d-flex justify-content-center">
            <div class="form-check">
            </div>
        </div>
    
        <div class="col">
            <a aria-current="page" href="/forgot-password" data-link>Quên Mật Khẩu</a>
        </div>
    </div>

    <div class="text-center">
        <button id="loginBtn" class="btn btn-primary btn-block mb-2">Đăng nhập</button>
        <p>Hoặc</p>
        <button id="loginWithGoogle" class="btn btn-primary mb-4">Đăng nhập với Google</button>
    </div>
    
    <div class="text-center">
    <p>Bạn chưa có tài khoản? <a href="/signup" data-link aria-current="page">Đăng ký</a></p>
    </div>
</form>
</div>
`;
  }
}
