import AbstractView from "./AbstractView.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Đăng ký");
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

  setSignUpEvent() {
    const auth = getAuth(this.app);
    let googleMode;
    if (this.params.email != null) {
      googleMode = true;
    }
    document
      .getElementById("myBtn")
      .addEventListener("click", function (event) {
        event.preventDefault();
        let formSignUp = document.getElementById("myForm");
        let formData = new FormData(formSignUp);
        var object = {};
        formData.forEach(function (value, key) {
          object[key] = value;
        });
        object["imageUrl"] = localStorage.getItem("imageUrl");
        if (object["imageUrl"]==null) object["imageUrl"]="";
        console.log(object);
        if (googleMode) {
          let url = "http://localhost:8080/web_forbank/user-account";
          fetch(url, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object),
          })
            .then(function (response) {
              return response.json();
            })
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          createUserWithEmailAndPassword(
            auth,
            formData.get("taiKhoan"),
            formData.get("matKhau")
          )
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              let url = "http://localhost:8080/web_forbank/user-account";
              fetch(url, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(object),
              })
                .then(function (response) {
                  return response.json();
                })
                .then((result) => {
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                });
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        }
      });
  }

  getHtml() {
    return `
        <h2 id="errorMsg"></h2>
        <form id="myForm" name="myForm">
            <div class="form-group">
                <input type="text" class="form-control" id="cmnd" name="cmnd"
                    placeholder="CMND">
            </div>

            <div class="form-group">
                <input type="text" class="form-control" id="ho" name="ho"
                    placeholder="Họ">
            </div>

            <div class="form-group">
                <input type="text" class="form-control" id="ten" name="ten"
                    placeholder="Tên">
            </div>

            <div class="form-group">
                <input type="text" class="form-control" id="taiKhoan" name="taiKhoan"
                    placeholder="Email">
            </div>

            <div class="form-group">
                <input type="password" class="form-control" id="matKhau" name="matKhau"
                    placeholder="Mật khẩu">
            </div>

            <div class="form-group">
                <input type="password" class="form-control" id="nhapLaiMatKhau" name="nhapLaiMatKhau"
                    placeholder="Nhập lại mật khẩu">
            </div>

            <button id="myBtn" class="btn btn-primary">Đăng ký</button>

            <div class="form-group">
                <p>Bạn đã có tài khoản?</p>
            </div>
            <div class="form-group">
                <a aria-current="page" href="/user-login" data-link>Đăng nhập</a>
            </div>
        </form>`;
  }
}
