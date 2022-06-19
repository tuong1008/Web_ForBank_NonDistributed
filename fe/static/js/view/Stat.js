import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Sao kê");
    }

    setEventBtn(callback){
        //form validation
        $("#formSignUp").validate({
            onkeyup: function(element) {
                $(element).valid();
            },
            rules: {
                tuNgay: {
                    required: true,
                    date: true
                },
                denNgay: {
                    required: true,
                    date: true
                }
            },
            messages: {
                tuNgay: {
                    required: "Bắt buộc nhập ngày",
                    date: "Nhập sai định dạng"
                },
                denNgay: {
                    required: "Bắt buộc nhập ngày",
                    date: "Nhập sai định dạng"
                }
            }
        });
        //end form validation
        let soTK = this.params.id;
        document.getElementById("signUpBtn").addEventListener("click", function(event){
            event.preventDefault();
            if (!$("#formSignUp").valid()) return;
            let formSignUp = document.getElementById('formSignUp');
            let formData = new FormData(formSignUp);
            let url = `http://localhost:8080/web_forbank/api-bank-account-statement?soTK=${soTK}&tuNgay=${formData.get("tuNgay")}&denNgay=${formData.get("denNgay")}`;
            fetch(url, {credentials: 'include'})
            .then(function (response) {
                return response.json();
            })
            .then(function (trans) {
                console.log(trans);

                callback() //to reload
                let x = document.getElementById("table");
                let hasTbody = document.getElementsByTagName("tbody");
                if (hasTbody.length == 0) {
                    let body = document.createElement("tbody");
                    x.appendChild(body);
                } else {
                    hasTbody[0].innerHTML = '';
                }
                for (let tran of trans) {
                    let ngayGD = new Date(tran.ngayGD);
                    let row = document.createElement("TR");

                    row.innerHTML = `
                        <td>${tran.balanceBefore}</td>
                        <td>${ngayGD.getDate()}-${ngayGD.getMonth() + 1}-${ngayGD.getFullYear()} ${ngayGD.getHours()}:${ngayGD.getMinutes()}</td>
                        <td>${tran.loaiGD}</td>
                        <td>${tran.soTien}</td>
                        <td>${tran.balanceAfter}</td>
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
                console.log(err);
            });
        });
    }

    getHtml() {
        return `
        <form id="formSignUp" name="formSignUp">
            <div class="form-group">
                <input type="date" class="form-control" id="tuNgay" name="tuNgay" placeholder="Từ ngày" value="2021-01-01">
            </div>
            <div class="form-group">
                <input type="date" class="form-control" id="denNgay" name="denNgay" placeholder="Đến ngày" value="2023-01-01">
            </div>
            <button id="signUpBtn" class="btn btn-primary">Liệt kê</button>
        </form>
        <table id="table" class="table table-primary">
        <thead>
            <tr>
                <th>Số dư đầu</th>
                <th>Ngày</th>
                <th>Loại giao dịch</th>
                <th>Số tiền</th>
                <th>Số dư sau</th>
            </tr>
        </thead>
        </table>
        `;
    }
}