import AbstractView from "./AbstractView.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
    getAuth,
    sendPasswordResetEmail
  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Quên Mật Khẩu");
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

    setEventBtn(){
        const auth = getAuth(this.app);
        document.getElementById("myBtn").addEventListener("click", function(event) {
            event.preventDefault();
            sendPasswordResetEmail(auth, document.getElementById("email").value)
            .then(() => {
                console.log("Password reset email sent!");
                // ..
            })
            .catch((error) => {
                console.log(error);
                // ..
            });
        });
    }

    getHtml() {
        return `
        <h2 id="errorMsg"></h2>
        <form id="myForm" name="myForm">
            <div class="form-group">
                <input type="text" class="form-control" id="email" name="email"
                    placeholder="Email">
            </div>
            
            <button id="myBtn" class="btn btn-primary">Khôi phục mật khẩu</button>
            </div>
        </form>`;
    }
}