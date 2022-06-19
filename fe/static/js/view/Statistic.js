import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Thống kê");
    }

    load(){
        var xValues = [50,60,70,80,90,100,110,120,130,140,150];
        var yValues = [7,8,8,9,9,9,10,11,14,14,15];

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
    }

    getHtml() {
        return `
            <h2 id="errorMsg"></h2>
            <div class="form-group">
                <input type="date" class="form-control" id="tuNgay" name="tuNgay" placeholder="Từ ngày" value="2021-01-01">
            </div>
            <div class="form-group">
                <input type="date" class="form-control" id="denNgay" name="denNgay" placeholder="Đến ngày" value="2023-01-01">
            </div>
            <button id="myBtn" class="btn btn-primary">Thống kê</button>
            <canvas id="myChart" style="width:100%;max-width:700px"></canvas>`;
      }
}