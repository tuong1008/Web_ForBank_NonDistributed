import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Cập nhật thông tin");
    }

    setEventBtn(callback) {
        //form validation
        $("#formSignUp").validate({
            onkeyup: function (element) {
                $(element).valid();
            },
            rules: {
                cmnd: {
                    required: true,
                    digits: true,
                    maxlength: 9
                },
                ho: {
                    required: true,
                    validateTiengViet: true,
                    maxlength: 50
                },
                ten: {
                    required: true,
                    validateTiengViet: true,
                    maxlength: 10
                },
                diaChi: {
                    maxlength: 100
                },
                soDu: {
                    digits: true,
                    min: 0
                },
                ngayCap: {
                    required: true,
                    date: true,
                    validateNgayCap: true
                },
                soDT: {
                    required: true,
                    // maxlength: 11
                    validateSoDT: true
                }
            },
            messages: {
                cmnd: {
                    required: "Bắt buộc nhập Họ",
                    digits: "Bắt buộc nhập số",
                    maxlength: "Hãy nhập tối đa 9 ký tự"
                },
                ho: {
                    required: "Bắt buộc nhập Họ",
                    maxlength: "Hãy nhập tối đa 50 ký tự"
                },
                ten: {
                    required: "Bắt buộc nhập Tên",
                    maxlength: "Hãy nhập tối đa 10 ký tự"
                },
                diaChi: {
                    maxlength: "Hãy nhập tối đa 100 ký tự"
                },
                soDu: {
                    digits: "Bắt buộc nhập số",
                    min: "Hãy nhập số dương"
                },
                ngayCap: {
                    required: "Bắt buộc nhập ngày",
                    date: "Nhập sai định dạng"
                },
                soDT: {
                    required: "Bắt buộc nhập số điện thoại",
                    //maxlength: "Hãy nhập tối đa 11 ký tự"
                }
            }
        });
        //end form validation
        document.getElementById("signUpBtn").addEventListener("click", function (event) {
            if (!$("#formSignUp").valid()) return;
            let formSignUp = document.getElementById('formSignUp');
            let formData = new FormData(formSignUp);
            formData.append("phai", document.getElementById("phai").value);
            var object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            console.log(object);
            let url = "http://localhost:8080/web_forbank/api-customer";
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
                    if ((result.message).includes("thành công")) {
                        callback();
                    } else {
                        document.getElementById("errorMsg").innerHTML = result.message;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            event.preventDefault();
        });
    }

    load() {
        let url = `http://localhost:8080/web_forbank/api-customer?cmnd=${this.params.id}`;
        fetch(url, {credentials: 'include'})
            .then(function (response) {
                return response.json();
            })
            .then(function (customer) {
                console.log(customer);
                document.getElementById("cmnd").value = customer.cmnd;
                document.getElementById("ho").value = customer.ho;
                document.getElementById("ten").value = customer.ten;
                document.getElementById("diaChi").value = customer.diaChi;
                document.getElementById("phai").value = customer.phai;
                document.getElementById("ngayCap").value = customer.ngayCap;
                document.getElementById("soDT").value = customer.soDT;
            });
    };


    getHtml() {
        console.log(this.params.id);
        return `
<div class="d-flex align-items-center justify-content-center">

<h2 id="errorMsg"></h2>
<form id="formSignUp" name="formSignUp">
    <div class="form-group">
        <input type="text" class="form-control mb-2" id="cmnd" name="cmnd" placeholder="CMND">
    </div>
    <div class="form-group">
        <input type="text" class="form-control mb-2" id="ho" name="ho" placeholder="Họ">
    </div>
    <div class="form-group">
        <input type="text" class="form-control mb-2" id="ten" name="ten" placeholder="Tên">
    </div>
    <div class="form-group">
        <input type="text" class="form-control mb-2" id="diaChi" name="diaChi" placeholder="Địa chỉ">
    </div>

    <select id="phai">
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
    </select>

    <div class="form-group">
        <input type="text" class="form-control mb-2" id="ngayCap" name="ngayCap" placeholder="Ngày Cấp">
    </div>

    <div class="form-group">
        <input type="text" class="form-control mb-2" id="soDT" name="soDT" placeholder="Số Điện Thoại">
    </div>

    <button id="signUpBtn" class="btn btn-primary">Cập Nhật</button>
</form>
</div>
`;
    }
}