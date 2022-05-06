import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Khách hàng");
    }

    setDeleteEvent(callback) {
        if (confirm("Are you sure DELETE!")) {
            let cmnd = this.params.id;
            let object = { 'cmnd': cmnd };
            let url = "http://localhost:8080/web_forbank/api-customer";
            fetch(url, {
                method: "DELETE",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
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
        }
    }

    setEventBtn(callback) {
        document.getElementById("addBtn").addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelector("#app").innerHTML = `
            <h2 id="errorMsg"></h2>
            <form id="formSignUp" name="formSignUp">
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
                    <input type="text" class="form-control" id="diaChi" name="diaChi"
                        placeholder="Địa chỉ">
                </div>

                <select id="phai">
                    <option value="Nam" selected>Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>

                <div class="form-group">
                    <input type="date" class="form-control" id="ngayCap" name="ngayCap"
                        placeholder="Ngày Cấp">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="soDT" name="soDT"
                        placeholder="Số điện thoại">
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control" id="soDu" name="soDu"
                        placeholder="Số Dư">
                </div>
                <button id="signUpBtn" class="btn btn-primary">Mở Tài Khoản</button>
            </form>`;
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
                    }
                }
            });
            //end form validation
            document.getElementById("signUpBtn").addEventListener("click", function (event) {
                if (!$("#formSignUp").valid()) return;
                let formSignUp = document.getElementById('formSignUp');
                let formData = new FormData(formSignUp);

                //formData.append("ngayCap", document.getElementById("ngayCap").value);
                formData.append("phai", document.getElementById("phai").value);
                var object = {};
                formData.forEach(function (value, key) {
                    object[key] = value;
                });
                let birthday = new Date(object["ngayCap"]);
                object["ngayCap"] = `${birthday.getDate()}-${birthday.getMonth() + 1}-${birthday.getFullYear()}`;
                console.log(object);
                let url = "http://localhost:8080/web_forbank/api-customer";
                fetch(url, {
                    method: "POST",
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(object)
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(result => {
                        console.log(result);
                        if ((result.message).includes("thành công")) {
                            callback();
                            document.getElementById("undoBtn").disabled = false;
                        } else {
                            document.getElementById("errorMsg").innerHTML = result.message;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                event.preventDefault();
            });
        });
    }

    setUndoEvent(callback) {
        document.getElementById("undoBtn").addEventListener("click", function (event) {
            event.preventDefault();
            let url = "http://localhost:8080/web_forbank/api-undo";
            fetch(url, {credentials: 'include'})
                .then(function (response) {
                    return response.json();
                })
                .then(result => {
                    console.log(result);
                    if ((result.message).includes("Hết")) {
                        callback();
                        document.getElementById("undoBtn").disabled = true;
                    } else if ((result.message).includes("thành công")) {
                        callback();
                        document.getElementById("undoBtn").disabled = false;
                    } else {
                        document.getElementById("errorMsg").innerHTML = result.message;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    setLietKeEvent(callback) {
        document.getElementById("signUpBtn").addEventListener("click", function (event) {
            event.preventDefault();
            let formSignUp = document.getElementById('formSignUp');
            let formData = new FormData(formSignUp);
            formData.append("maCN", document.getElementById("branchs").value);
            let url = "http://localhost:8080/web_forbank/api-bank-created-customer";
            fetch(url, { credentials: 'include',
                        headers: {"maCN": formData.get("maCN")}
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (customers) {
                    console.log(customers);

                    callback(); //to reload
                    let x = document.getElementById("table");
                    let hasTbody = document.getElementsByTagName("tbody");
                    if (hasTbody.length==0){
                        let body = document.createElement("tbody");
                        x.appendChild(body);
                    }else{
                        hasTbody[0].innerHTML='';
                    }
                    for (let customer of customers) {
                        let birthday = new Date(customer.ngayCap);
                        let row = document.createElement("TR");
                        row.innerHTML = `
                        <td>${customer.cmnd}</td>
                        <td>${customer.ho}</td>
                        <td>${customer.ten}</td>
                        <td>${customer.diaChi}</td>
                        <td>${customer.phai}</td>
                        <td>${birthday.getDate()}-${birthday.getMonth() + 1}-${birthday.getFullYear()}</td>
                        <td>${customer.soDT}</td>
                        <td>
                        <a href="/customerUpdate/${customer.cmnd}" data-link>U</a>
                        </td>
                        `
                        hasTbody[0].appendChild(row);

                        console.log("clicking");
                    }
                    setTimeout(function () {
                        $('#table').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                'copyHtml5',
                                'excelHtml5',
                                'csvHtml5',
                                'pdfHtml5'
                            ]
                        });
                    }, 300);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    load(callback) {
        let url = "http://localhost:8080/web_forbank/api-customer";
        fetch(url, { credentials: 'include' })
            .then(function (response) {
                return response.json();
            })
            .then(function (customers) {
                let tenNhom = document.getElementById("tenNhom").value;
                if (tenNhom.toUpperCase() == "NGANHANG") {
                    fetch("http://localhost:8080/web_forbank/api-branch", {credentials: 'include'})
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (branchs) {
                                let x = document.getElementById("branchs");
                                $("#branchs").empty();
                                for (let branch of branchs) {
                                    let option = document.createElement("option");
                                    option.text = branch.tenCN;
                                    option.value = branch.maCN;
                                    x.add(option);
                                }
                                let opt = document.createElement("option");
                                opt.text = "Tất cả";
                                opt.value = "getAll";
                                x.add(opt);
                            });
                }
                else{
                    console.log(customers);
                    let x = document.getElementById("table");
                    let hasTbody = document.getElementsByTagName("tbody");
                    if (hasTbody.length==0){
                        let body = document.createElement("tbody");
                        x.appendChild(body);
                    }else{
                        hasTbody[0].innerHTML='';
                    }
                    for (let customer of customers) {
                        let birthday = new Date(customer.ngayCap);
                        let row = document.createElement("TR");
                        row.innerHTML = `
                            <td>${customer.cmnd}</td>
                            <td>${customer.ho}</td>
                            <td>${customer.ten}</td>
                            <td>${customer.diaChi}</td>
                            <td>${customer.phai}</td>
                            <td>${birthday.getDate()}-${birthday.getMonth() + 1}-${birthday.getFullYear()}</td>
                            <td>${customer.soDT}</td>
                            <td>
                            <a href="/customerUpdate/${customer.cmnd}" data-link>U</a>
                            </td>`;
                        hasTbody[0].appendChild(row);
                    }
                    setTimeout(function () {
                        $('#table').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                'copyHtml5',
                                'excelHtml5',
                                'csvHtml5',
                                'pdfHtml5'
                            ]
                        });
                    }, 300);
                }
            })
            .catch(err => {
                console.log(err);
                callback();
            });
    };

    getHtml() {
        let tenNhom = document.getElementById("tenNhom").value;
        if (tenNhom.toUpperCase() == "NGANHANG") {
            return `
            <form id="formSignUp" name="formSignUp">
                <select name="branchs" id="branchs">
                    <option value="getAll">Tất cả</option>
                </select>
                <button id="signUpBtn" class="btn btn-primary">Liệt kê</button>
            </form>
            <table id="table" class="table table-primary">
                <thead>
                <tr>
                    <th>CMND</th>
                    <th>Họ</th>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th>Phái</th>
                    <th>Ngày Cấp</th>
                    <th>Số Điện Thoại</th>
                    <th></th>
                </tr>
                </thead>
            </table>
            `;
        }
        else {
            return `
            <button id="addBtn" class="btn btn-primary">Thêm Khách Hàng</button>
            <button id="undoBtn" class="btn btn-primary" disabled>Hoàn Tác</button>
            <h2 id="errorMsg"></h2>
            <table id="table" class="table table-primary">
                <thead>
                <tr>
                    <th>CMND</th>
                    <th>Họ</th>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th>Phái</th>
                    <th>Ngày Cấp</th>
                    <th>Số Điện Thoại</th>
                    <th></th>
                </tr>
                </thead>
            </table>
            `;
        }
    }
}