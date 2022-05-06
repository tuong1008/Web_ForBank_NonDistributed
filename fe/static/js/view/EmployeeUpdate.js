import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Cập nhật nhân viên");
    }

    setEventBtn(callback){
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
    }

    load() {
        let url = `http://localhost:8080/web_forbank/api-employee?maNV=${this.params.id}`;
        fetch(url, {credentials: 'include'})
            .then(function (response) {
                return response.json();
            })
            .then(function (employee) {
                console.log(employee);
                document.getElementById("maNV").value = employee.maNV;
                document.getElementById("ho").value = employee.ho;
                document.getElementById("ten").value = employee.ten;
                document.getElementById("diaChi").value = employee.diaChi;
                document.getElementById("phai").value = employee.phai;
                document.getElementById("soDT").value = employee.soDT;
            });
    };


    getHtml() {
        console.log(this.params.id);
        return `
        <h2 id="errorMsg"></h2>
        <form class="form-control" id="formSignUp" name="formSignUp">
            <div class="form-group">
                <input type="text" class="form-control" id="maNV" name="maNV"
                    placeholder="Mã Nhân Viên">
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
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>

            <div class="form-group">
                <input type="text" class="form-control" id="soDT" name="soDT"
                    placeholder="Số Điện Thoại">
            </div>

            <button id="signUpBtn" class="btn btn-primary">Cập Nhật</button>
        </form>
        `;
    }
}