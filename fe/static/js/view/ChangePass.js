import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("EmployeeUpdate");
    }

    setEventBtn(callback){
        //form validation
        $("#formSignUp").validate({
            onkeyup: function(element) {
                $(element).valid();
            },
            rules: {
                old_pass: {
                    required: true,
                    maxlength: 50
                },
                pass: {
                    required: true,
                    maxlength: 50
                },
                re_pass: {
                    required: true,
                    maxlength: 50,
                    equalTo: "#pass"
                }
            },
            messages: {
                old_pass: {
                    required: "Bắt buộc nhập mật khẩu",
                    maxlength: "Hãy nhập tối đa 50 ký tự"
                },
                pass: {
                    required: "Bắt buộc nhập mật khẩu",
                    maxlength: "Hãy nhập tối đa 50 ký tự"
                },
                re_pass: {
                    required: "Bắt buộc nhập mật khẩu",
                    maxlength: "Hãy nhập tối đa 50 ký tự",
                    equalTo: "Mật khẩu không giống nhau"
                }
            }
        });
        //end form validation
        document.getElementById("signUpBtn").addEventListener("click", function(event){
            if (!$("#formSignUp").valid()) return;
            let formSignUp = document.getElementById('formSignUp');
            let formData = new FormData(formSignUp);
            var object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            console.log(object);
            let url = "http://localhost:8080/web_forbank/api-user-login";
            fetch(url, {
                method: "PUT",
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(object)
            })
                .then(function (response) {
                    return response.json();
                })
                .then(result => {
                    console.log(result);
                    if ((result.message).includes("thành công")){
                        callback();
                    }
                    else{
                        document.getElementById("errorMsg").innerHTML =  result.message;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            event.preventDefault();
        });
    }

    getHtml() {
        console.log(this.params.id);
        return `
<div class="d-flex align-items-center justify-content-center">
<h2 id="errorMsg"></h2>
<form id="formSignUp" name="formSignUp" style="width: 25rem;">
    <div class="form-group">
    <div>    
        <input type="password" class="form-control" id="old_pass" name="old_pass"
        placeholder="Nhập password cũ">
    </div>
    <div>
        <input type="password" class="form-control" id="pass" name="pass"
        placeholder="Nhập password mới">
    </div>
    <div>
        <input type="password" class="form-control" id="re_pass" name="re_pass"
        placeholder="Nhập lại password mới">
    </div>
    
    <button id="signUpBtn" class="btn btn-primary">Cập nhật</button>
</form>
</div>
        `;
    }
}