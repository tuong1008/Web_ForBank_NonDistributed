import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("EmployeeTransfer");
    }

    load() {
        let url = "http://localhost:8080/web_forbank/api-branch?currentSub="+this.params.maCN;
        fetch(url, {credentials: 'include'})
            .then(function (response) {
                return response.json();
            })
            .then(function (subscribers) {
                let x = document.getElementById("subscribers");
                for (let subscriber of subscribers) {
                    let option = document.createElement("option");
                    option.text = subscriber.tenCN;
                    option.value = subscriber.maCN;
                    x.add(option);
                }
            });
    };

    setEventBtn(callback){
        let maNV = this.params.id;
        document.getElementById("loginBtn").addEventListener("click", function(event) {
            event.preventDefault();
            let formLogin = document.getElementById('formLogin');
            let formData = new FormData(formLogin);
            formData.append("maNV", maNV);
            formData.append("maCNChuyenDen", document.getElementById("subscribers").value);
            var object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            console.log(object);
            let url = "http://localhost:8080/web_forbank/api-employee?action=transfer";
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
                    //login fail, show message error that return by json
                    document.getElementById("errorMsg").innerHTML =  err;
                });
        });
    }

    getHtml() {
        return `
        <h2 id="errorMsg"></h2>
    <form id="formLogin" name="formLogin" class="form-control">
        <select name="subscribers" id="subscribers" class="form-select">
        </select>
        <button id="loginBtn" class="btn btn-primary">Chuyển</button>
    </form>`;
    }
}