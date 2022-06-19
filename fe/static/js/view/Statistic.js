import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Thống kê");
    }

    load(){
      let xValues = [];
      let yValues = [];
      let myForm = document.getElementById('myForm');
      let formData = new FormData(myForm);
      let url = `http://localhost:8080/web_forbank/api-bank-account-statement?soTK=${localStorage.getItem("soTK")}&tuNgay=${formData.get("tuNgay")}&denNgay=${formData.get("denNgay")}`;
      fetch(url, {credentials: 'include'})
      .then(function (response) {
          return response.json();
      })
      .then(function (trans) {
          console.log(trans);
          for (let i = 0; i < trans.length; i++) {
            xValues[i] = i;
            yValues[i] = trans[i].balanceBefore;
            if (i==trans.length-1){
              xValues[i+1] = i+1;
              yValues[i+1] = trans[i].balanceAfter;
            }
          }
          
          new Chart("myChart", {
            type: "line",
            data: {
              labels: xValues,
              datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
              }]
            },
            options: {
              legend: {display: false}
            }
          });
      })
      .catch(err => {
          console.log(err);
      });
  }

    setEventBtn(){
      let load = this.load;
      document.getElementById("myBtn").addEventListener("click", function(event){
        event.preventDefault();
        load();
    });
    }

    getHtml() {
        return `
            <h2 id="errorMsg"></h2>
            <form id="myForm" name="mForm">
                <div class="form-group">
                    <input type="date" class="form-control" id="tuNgay" name="tuNgay" placeholder="Từ ngày" value="2021-01-01">
                </div>
                <div class="form-group">
                    <input type="date" class="form-control" id="denNgay" name="denNgay" placeholder="Đến ngày" value="2023-01-01">
                </div>
                <button id="myBtn" class="btn btn-primary">Thống kê</button>
            </form>
            <canvas id="myChart" style="width:100%;max-width:700px"></canvas>`;
      }
}