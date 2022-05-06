import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Nhân viên");
    }

    setEventBtn(callback){
        document.getElementById("addBtn").addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector("#app").innerHTML =`
            <h2 id="errorMsg"></h2>
            <form id="formSignUp" name="formSignUp">
                <div class="form-group">
                    <input type="text" class="form-control" id="ho" name="ho"
                        placeholder="Họ">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="ten" name="ten"
                        placeholder="Tên">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="diaChi" name="diaChi"
                        placeholder="Địa chỉ">
                </div>

                <select id="phai">
                    <option value="Nam" selected>Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>

                <div class="form-group">
                    <input type="text" class="form-control" id="soDT" name="soDT"
                        placeholder="Số điện thoại">
                </div>
                
                <div class="form-group">
                    <input type="password" class="form-control" id="pass" name="pass"
                        placeholder="Password">
                </div>
                <button id="signUpBtn" class="btn btn-primary">Đăng ký</button>
            </form>`;
            //form validation
            $("#formSignUp").validate({
                onkeyup: function(element) {
                    $(element).valid();
                },
                rules: {
                    ho: {
                        required: true,
                        validateTiengViet: true,
                        maxlength: 40
                    },
                    ten: {
                        required: true,
                        validateTiengViet: true,
                        maxlength: 10
                    },
                    diaChi: {
                        maxlength: 100
                    },
                    soDT: {
                        required: true,
                        // maxlength: 11
                        validateSoDT: true
                    },
                    pass: {
                        required: true,
                        maxlength: 50
                    }
                },
                messages: {
                    ho: {
                        required: "Bắt buộc nhập Họ",
                        maxlength: "Hãy nhập tối đa 40 ký tự"
                    },
                    ten: {
                        required: "Bắt buộc nhập Tên",
                        maxlength: "Hãy nhập tối đa 10 ký tự"
                    },
                    diaChi: {
                        maxlength: "Hãy nhập tối đa 100 ký tự"
                    },
                    soDT: {
                        required: "Bắt buộc nhập số điện thoại",
                        //maxlength: "Hãy nhập tối đa 11 ký tự"
                    },
                    pass: {
                        required: "Bắt buộc nhập mật khẩu",
                        maxlength: "Hãy nhập tối đa 50 ký tự"
                    }
                }
            });
            //end form validation
            document.getElementById("signUpBtn").addEventListener("click", function(event){
                if (!$("#formSignUp").valid()) return;
                let formSignUp = document.getElementById('formSignUp');
                let formData = new FormData(formSignUp);
                formData.append("phai", document.getElementById("phai").value);
                var object = {};
                formData.forEach(function(value, key){
                    object[key] = value;
                });
                console.log(object);
                let url = "http://localhost:8080/web_forbank/api-employee";
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
                        if ((result.message).includes("thành công")){
                            callback();
                            document.getElementById("undoBtn").disabled =  false;
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
        });
    }

    setDeleteEvent(callback){
        if (confirm("Are you sure DELETE!")) {
            let maNV = this.params.id;
            let object = {'maNV': maNV};
            let url = "http://localhost:8080/web_forbank/api-employee";
            fetch(url, {
                method: "DELETE",
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
                        document.getElementById("undoBtn").disabled =  false;
                    }
                    else{
                        document.getElementById("errorMsg").innerHTML =  result.message;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    setUndoEvent(callback){
        document.getElementById("undoBtn").addEventListener("click", function(event) {
            event.preventDefault();
            let url = "http://localhost:8080/web_forbank/api-undo";
        fetch(url, {credentials: 'include'})
            .then(function (response) {
                return response.json();
            })
            .then(result => {
                console.log(result);
                if ((result.message).includes("Hết")){
                    callback();
                    document.getElementById("undoBtn").disabled =  true;
                }
                else if ((result.message).includes("thành công")){
                    callback();
                    document.getElementById("undoBtn").disabled =  false;
                }
                else{
                    document.getElementById("errorMsg").innerHTML =  result.message;
                }
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    load(callback) {
        let url = "http://localhost:8080/web_forbank/api-employee";
        fetch(url, {credentials: 'include'})
            .then(function (response) {
                return response.json();
            })
            .then(function (employees) {
                console.log(employees);
                let x = document.getElementById("table");
                let body = document.createElement("tbody");
                x.appendChild(body);
                for (let employee of employees) {
                    let row = document.createElement("TR");
                    row.innerHTML = `
                    <td>${employee.maNV}</td>
                    <td>${employee.ho}</td>
                    <td>${employee.ten}</td>
                    <td>${employee.diaChi}</td>
                    <td>${employee.phai}</td>
                    <td>${employee.soDT}</td>
                    <td>${employee.maCN}</td>
                    <td>${employee.trangThaiXoa}</td>
                    <td>
                    <a href="/employeeUpdate/${employee.maNV}" data-link>U</a>
                    <a href="/employeeDelete/${employee.maNV}" data-link>D</a>
                    <a href="/employeeTransfer/${employee.maNV}/${employee.maCN}" data-link>T</a>
                    </td>
                    `;
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
        <button id="addBtn" class="btn btn-primary">Thêm Nhân Viên</button>
        <button id="undoBtn" class="btn btn-primary" disabled>Hoàn Tác</button>
        <h2 id="errorMsg"></h2>
        <table id="table" class="table table-primary">
        <thead class="table table-light">
        <tr>
            <th>Mã Nhân Viên</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>Phái</th>
            <th>Số Điện Thoại</th>
            <th>Mã Chi Nhánh</th>
            <th>Trạng Thái</th>
            <th>Thao tác</th>
        </tr>
        </thead>
      </table>
        `;
    }
}