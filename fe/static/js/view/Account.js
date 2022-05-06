import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Tài khoản");
    }

    //event cho NGANHANG
    setEventBtn(callback){
        document.getElementById("submitBtn").addEventListener("click", function(event) {
            event.preventDefault();
            let myForm = document.getElementById('myForm');
            let formData = new FormData(myForm);
            formData.append("maCN", document.getElementById("branchs").value);
            console.log(formData.get("tuNgay"));
            console.log(formData.get("denNgay"));
            console.log(formData.get("maCN"));
            let url = `http://localhost:8080/web_forbank/api-bank-created-account?maCN=${formData.get("maCN")}&tuNgay=${formData.get("tuNgay")}&denNgay=${formData.get("denNgay")}`;
            fetch(url, {credentials: 'include'})
                .then(function (response) {
                    return response.json();
                })
                .then(accounts => {
                    console.log(accounts);
                
                    callback(); //to reload
                    let x = document.getElementById("table");
                    let hasTbody = document.getElementsByTagName("tbody");
                    if (hasTbody.length==0){
                        let body = document.createElement("tbody");
                        x.appendChild(body);
                    }else{
                        hasTbody[0].innerHTML='';
                    }
                    for (let account of accounts) {
                        let birthday = new Date(account.ngayMoTK);
                        let row = document.createElement("TR");
                        row.innerHTML = `
                            <td>${account.soTK}</td>
                            <td>${account.cmnd}</td>
                            <td>${account.soDu}</td>
                            <td>${account.maCN}</td>
                            <td>${birthday.getDate()}-${birthday.getMonth() + 1}-${birthday.getFullYear()} ${birthday.getHours()}:${birthday.getMinutes()}</td>
                            <td><a class="text-success" href="stat/${account.soTK}" data-link>Sao kê</a></td>
                            `
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
                })
                .catch(err => {
                    document.getElementById("errorMsg").innerHTML =  err;
                });
        });
    }

    setDeleteEvent(callback) {
        if (confirm("Are you sure DELETE!")) {
            let soTK = this.params.id;
            let object = {'soTK': soTK};
            let url = "http://localhost:8080/web_forbank/api-account";
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
        }
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

    load(callback) {
        let url = "http://localhost:8080/web_forbank/api-account";
        fetch(url, {credentials: 'include'})
            .then(function (response) {
                return response.json();
            })
            .then(function (accounts) {
                    let tenNhom = document.getElementById("tenNhom").value;
                    if (tenNhom.toUpperCase()=="CHINHANH"){
                        console.log(accounts);
                        let x = document.getElementById("table");
                        let hasTbody = document.getElementsByTagName("tbody");
                        if (hasTbody.length == 0) {
                            let body = document.createElement("tbody");
                            x.appendChild(body);
                        } else {
                            hasTbody[0].innerHTML = '';
                        }
                        for (let account of accounts) {
                            let birthday = new Date(account.ngayMoTK);
                            let row = document.createElement("TR");
                            row.innerHTML = `
                        <td>${account.soTK}</td>
                        <td>${account.cmnd}</td>
                        <td>${account.soDu}</td>
                        <td>${account.maCN}</td>
                        <td>${birthday.getDate()}-${birthday.getMonth() + 1}-${birthday.getFullYear()} ${birthday.getHours()}:${birthday.getMinutes()}</td>
                        <td><a href="/accountDelete/${account.soTK}" data-link>D</a></td>
                        `
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
                    else{
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

            })
            .catch(err => {
                console.log(err);
                callback();
            });
    };

    getHtml() {
    let tenNhom = document.getElementById("tenNhom").value;
    if (tenNhom.toUpperCase()=="NGANHANG"){
        return `
        <h2 id="errorMsg"></h2>
        <form id="myForm" name="myForm">
            <select name="branchs" id="branchs">
                <option value="getAll">Tất cả</option>
            </select>
            <div class="form-group">
                <input type="date" class="form-control" id="tuNgay" name="tuNgay" placeholder="Từ ngày">
                </div>
            <div class="form-group">
                <input type="date" class="form-control" id="denNgay" name="denNgay" placeholder="Đến ngày">
            </div>
            <button id="submitBtn" class="btn btn-primary">Liệt kê</button>
        </form>
        <table id="table" class="table table-primary">
        <thead>
            <tr>
                <th>Số Tài Khoản</th>
                <th>CMND</th>
                <th>Số Dư</th>
                <th>Mã Chi Nhánh</th>
                <th>Ngày Mở TK</th>
                <th></th>
            </tr>
        </thead>
        </table>
        `;
    }
    else{
        return `
        <button id="undoBtn" class="btn btn-primary" disabled>Hoàn Tác</button>
        <h2 id="errorMsg"></h2>
        <table id="table" class="table table-primary">
        <thead>
            <tr>
                <th>Số Tài Khoản</th>
                <th>CMND</th>
                <th>Số Dư</th>
                <th>Mã Chi Nhánh</th>
                <th>Ngày Mở TK</th>
                <th></th>
            </tr>
        </thead>
        </table>
        `;
    }
    }
}