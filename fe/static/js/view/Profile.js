import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Thông tin cá nhân");
  }

  setEventBtn() {
    let isChangeAvatar = false;
    document.getElementById("picture").addEventListener("change", function () {
      isChangeAvatar = true;
    });
    document
      .getElementById("myBtn")
      .addEventListener("click", function (event) {
        event.preventDefault();
        let myForm = document.getElementById("myForm");
        let formData = new FormData(myForm);

        let oldFileName = formData.get("picture").name;
        let extension = ""; //đuôi file

        let index = oldFileName.lastIndexOf(".");
        if (index > 0) {
          extension = oldFileName.substring(index);
        }

        if (isChangeAvatar) {
          formData.set(
            "picture",
            document.getElementById("picture").files[0],
            formData.get("cmnd") + extension
          );
          console.log(formData.get("picture").name);
          //save hình lên server
          let tempImageUrl = "/avatar/" + formData.get("picture").name;
          fetch("http://localhost:8080/web_forbank/image?folderToSave=avatar", {
            method: "POST",
            credentials: "include",
            body: formData,
          })
            .then(function (response) {
              return response.json();
            })
            .then((result) => {
              console.log(result);
              if (result.message.includes("thành công")) {
                //update image url
                localStorage.setItem("imageUrl", tempImageUrl);
                fetch(
                    "http://localhost:8080/web_forbank/user-account",
                    {
                      method: "PUT",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        imageUrl: localStorage.getItem("imageUrl"),
                        userId: localStorage.getItem("userId"),
                      }),
                    }
                  )
                    .then(function (response) {
                      return response.json();
                    })
                    .then((result) => {
                      console.log(result);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        formData.delete("picture");
        let object = {};
        formData.forEach(function (value, key) {
          object[key] = value;
        });
        let tempNgayCap = new Date(object["ngayCap"]);
        if (tempNgayCap.getMonth() <= 8) {
          object["ngayCap"] =
            tempNgayCap.getDate() +
            "-0" +
            (tempNgayCap.getMonth() + 1) +
            "-" +
            tempNgayCap.getFullYear()
        } else {
          object["ngayCap"] =
            tempNgayCap.getDate() +
            "-" +
            (tempNgayCap.getMonth() + 1) +
            "-" +
            tempNgayCap.getFullYear();
        }
        console.log(object);
        fetch("http://localhost:8080/web_forbank/api-customer", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(object),
        })
          .then(function (response) {
            return response.json();
          })
          .then((result) => {
            console.log(result);
            if (result.message.includes("thành công")) {
              fetch(
                `http://localhost:8080/web_forbank/api-tk?cmnd=${localStorage.getItem(
                  "khachHangID"
                )}`,
                { credentials: "include" }
              )
                .then(function (response) {
                  return response.json();
                })
                .then(function (success) {
                  console.log(success);
                  alert("Cập nhật thành công!");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              document.getElementById("errorMsg").innerHTML = result.message;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  load() {
    let url = `http://localhost:8080/web_forbank/api-customer?cmnd=${localStorage.getItem(
      "khachHangID"
    )}`;
    fetch(url, { credentials: "include" })
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
        document.getElementById("avatar").src=`http://localhost:8080/web_forbank/image?path=${localStorage.getItem("imageUrl")}`;
        let tempNgayCap = new Date(customer.ngayCap);
        if (tempNgayCap.getMonth() <= 8) {
          document.getElementById("ngayCap").value =
            tempNgayCap.getFullYear() +
            "-0" +
            (tempNgayCap.getMonth() + 1) +
            "-" +
            tempNgayCap.getDate();
        } else {
          document.getElementById("ngayCap").value =
            tempNgayCap.getFullYear() +
            "-" +
            (tempNgayCap.getMonth() + 1) +
            "-" +
            tempNgayCap.getDate();
        }
        document.getElementById("soDT").value = customer.soDT;
      });
  }

  getHtml() {
    return `
        <h2 id="errorMsg"></h2>
        <form id="myForm" name="myForm">
            <div class="form-group">
            <img id="avatar" src="http://localhost:8080/web_forbank/image?path=${localStorage.getItem(
              "imageUrl"
              )}" alt="avatar" width="150" height="150">
            </div>
            <div class="form-group">
            <input type="file" class="form-control" id="picture" name="picture"
                    placeholder="Avatar">
            </div>

            <div class="form-group">
            <input type="text" class="form-control" id="cmnd" name="cmnd"
                    placeholder="CMND" readonly>
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

            <div class="form-group">
            <select name="phai" id="phai">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
            </div>

            <div class="form-group">
                <input type="text" class="form-control" id="soDT" name="soDT"
                    placeholder="Số điện thoại">
            </div>

            <div class="form-group">
                <input type="date" class="form-control" id="ngayCap" name="ngayCap"
                    placeholder="yyyy-MM-dd">
            </div>

            <button id="myBtn" class="btn btn-primary">Cập nhật</button>
        </form>`;
  }
}
