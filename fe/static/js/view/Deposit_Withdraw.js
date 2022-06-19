import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Gửi tiền - Rút tiền");
    }

    onClickBtn(callback) {
        document.querySelector("#app").innerHTML = `
<div class="d-flex align-items-center justify-content-center">
<h2 id="errorMsg"></h2>
<form id="formSignUp" name="formSignUp">
    <div class="form-group">
        <input type="text" class="form-control" id="soTK" name="soTK"
            placeholder="Số Tài Khoản">
    </div>

    <select id="loaiGD">
        <option value="GT" selected>Gởi Tiền</option>
        <option value="RT">Rút Tiền</option>
    </select>

    <div class="form-group">
        <input type="text" class="form-control" id="soTien" name="soTien"
            placeholder="Số Tiền">
    </div>
    <button id="signUpBtn" class="btn btn-primary">Xác nhận</button>
</form>
</div>
`;
        //form validation
        $("#formSignUp").validate({
            onkeyup: function (element) {
                $(element).valid();
            },
            rules: {
                soTK: {
                    required: true,
                    digits: true,
                    maxlength: 9
                },
                soTien: {
                    required: true,
                    digits: true,
                    min: 100000
                }
            },
            messages: {
                soTK: {
                    required: "Bắt buộc nhập Số tài khoản",
                    digits: "Bắt buộc nhập số",
                    maxlength: "Hãy nhập tối đa 9 ký tự"
                },
                soTien: {
                    required: "Bắt buộc nhập Số Tiền",
                    digits: "Bắt buộc nhập số",
                    min: "Giao dịch tối thiểu 100000"
                }
            }
        });
        //end form validation
        document.getElementById("signUpBtn").addEventListener("click", function (event) {
            if (!$("#formSignUp").valid()) return;
            let formSignUp = document.getElementById('formSignUp');
            let formData = new FormData(formSignUp);
            formData.append("loaiGD", document.getElementById("loaiGD").value);
            var object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            console.log(object);
            let url = "http://localhost:8080/web_forbank/api-deposit-withdraw";
            fetch(url, {
                method: "POST",
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

    setEventBtn(callback) {
        const onClickBtn = this.onClickBtn;
        document.getElementById("addBtn").addEventListener("click", function (event) {
            event.preventDefault();
            onClickBtn(callback);
        });
    }

    load(callback) {
        let url = "http://localhost:8080/web_forbank/api-deposit-withdraw";
        fetch(url, {credentials: 'include'})
            .then(function (response) {
                return response.json();
            })
            .then(function (trans) {
                console.log(trans);
                let x = document.getElementById("table");
                let body = document.createElement("tbody");
                x.appendChild(body);
                for (let tran of trans) {
                    let tranDate = new Date(tran.ngayGD);
                    let row = document.createElement("TR");
                    row.innerHTML = `
                    <td>${tran.maGD}</td>
                    <td>${tran.soTK}</td>
                    <td>${tran.loaiGD}</td>
                    <td>${tranDate.getDate()}-${tranDate.getMonth() + 1}-${tranDate.getFullYear()} ${tranDate.getHours()}:${tranDate.getMinutes()}</td>
                    <td>${tran.soTien}</td>
                    <td>${tran.maNV}</td>`
                    body.appendChild(row);
                }
            })
            .catch(err => {
                console.log(err);
                callback();
            });
    };

    getHtml() {
        return `
<button id="addBtn" class="btn btn-primary">Gởi hoặc Rút</button>
<table id="table" class="table table-primary">
    <thead>
    <tr>
        <th>Mã Giao Dịch</th>
        <th>Số Tài Khoản</th>
        <th>Loại</th>
        <th>Ngày Giao Dịch</th>
        <th>Số Tiền</th>
        <th>Mã Nhân Viên</th>
    </tr>
    </thead>
</table>
        `;
    }
}