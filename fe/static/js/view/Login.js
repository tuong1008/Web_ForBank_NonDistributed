import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Đăng nhập");
    }

    setEventBtn(callback) {
        document.getElementById("loginBtn").addEventListener("click", function (event) {
            let formLogin = document.getElementById('formLogin');
            let formData = new FormData(formLogin);
            console.log(formData.get("userName"));
            console.log(formData.get("password"));
            let url = "http://localhost:8080/web_forbank/api-user-login";
            fetch(url, {
                credentials: 'include',
                headers: {
                    "user": formData.get("userName"),
                    "password": formData.get("password"),
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(success => {
                    console.log(success);
                    // lưu thông tin user
                    document.getElementById("tenNhom").value = success.tenNhom;
                    document.getElementById("myUser").innerHTML = success.user;
                    document.getElementById("myMaCN").innerHTML = success.maCN;


                    document.getElementById("nav_item_login").hidden = true;
                    document.getElementById("nav_item_logout").hidden = false;

                    let navItemUpdate = document.getElementById("nav_item_update");
                    navItemUpdate.hidden = false;
                    navItemUpdate.href = `/employeeUpdate/${success.userName}`;

                    document.getElementById("nav_item_change_pass").hidden = false;

                    return callback();
                })
                .catch(err => {
                    //login fail, show message error that return by json
                    document.getElementById("errorMsg").innerHTML = 'Sai tài khoản hoặc mật khẩu';
                });
            event.preventDefault();
        });
    }

    logoutEvent() {
        let url = "http://localhost:8080/web_forbank/api-logout";
        fetch(url, {credentials: 'include'})
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                if ((result.message).includes("thành công")) {
                    document.getElementById("nav_item_login").hidden = false;
                    document.getElementById("nav_item_logout").hidden = true;
                    document.getElementById("nav_item_update").hidden = true;
                    document.getElementById("nav_item_change_pass").hidden = true;
                    document.getElementById("myUser").innerHTML = '';
                    document.getElementById("myMaCN").innerHTML = '';
                } else {
                    document.getElementById("errorMsg").innerHTML = result.message;
                }
            });
    }

    getHtml() {
        return `
<div class="d-flex align-items-center justify-content-center">
<h2 id="errorMsg"></h2>
<form id="formLogin" name="formLogin" class="form-control" style="width: 25rem;">
    <div class="form-group mb-4">
        <input type="text" class="form-control" id="userName" name="userName"
            placeholder="Tên đăng nhập">
    </div>

    <div class="form-group mb-4">
        <input type="password" class="form-control" id="password" name="password"
            placeholder="Mật khẩu">
    </div>
    <button id="loginBtn" class="btn btn-primary">Đăng nhập</button>
</form>
</div>
`;
    }
}