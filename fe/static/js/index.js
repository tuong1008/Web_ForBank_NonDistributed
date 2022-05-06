import Account from "./view/Account.js";
import Customer from "./view/Customer.js";
import CustomerUpdate from "./view/CustomerUpdate.js";
import Deposit_Withdraw from "./view/Deposit_Withdraw.js";
import Employee from "./view/Employee.js";
import EmployeeUpdate from "./view/EmployeeUpdate.js";
import EmployeeTransfer from "./view/EmployeeTransfer.js";
import Money_Transfer from "./view/Money_Transfer.js";
import Login from "./view/Login.js";
import ChangePass from "./view/ChangePass.js";
import Stat from "./view/Stat.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const router = async () => {
    const routes = [
        {path: "/money-transfer", view: Money_Transfer},
        {path: "/deposit-withdraw", view: Deposit_Withdraw},
        {path: "/customer", view: Customer},
        {path: "/customerUpdate/:id", view: CustomerUpdate},
        {path: "/customerDelete/:id", view: Customer},
        {path: "/account", view: Account},
        {path: "/accountDelete/:id", view: Account},
        {path: "/login", view: Login},
        {path: "/logout", view: Login},
        {path: "/changePass", view: ChangePass},
        {path: "/employee", view: Employee},
        {path: "/employeeDelete/:id", view: Employee},
        {path: "/employeeUpdate/:id", view: EmployeeUpdate},
        {path: "/employeeTransfer/:id/:maCN", view: EmployeeTransfer},
        {path: "/stat/:id", view: Stat}
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    //default match
    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    let params = getParams(match);
    const view = new match.route.view(params);
    if (view instanceof Login) {
        document.querySelector("#app").innerHTML = view.getHtml();
        view.setEventBtn(function () {
            navigateTo("/deposit-withdraw");
        });
        if (match.route.path == "/logout") {
            view.logoutEvent();
        }
    }
    if (view instanceof ChangePass) {
        document.querySelector("#app").innerHTML = view.getHtml();
        view.load();
        view.setEventBtn(function () {
            navigateTo("/deposit-withdraw");
        });
    } else if (view instanceof Employee) {
        if (match.route.path.includes("employeeDelete")) {
            view.setDeleteEvent(function () {
                navigateTo("/employee");
            });
        } else {
            document.querySelector("#app").innerHTML = view.getHtml();
            view.load(function () {
                navigateTo("/login");
            });
            view.setEventBtn(function () {
                navigateTo("/employee");
            });
            view.setUndoEvent(function () {
                navigateTo("/employee");
            });

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
    } else if (view instanceof EmployeeUpdate) {
        document.querySelector("#app").innerHTML = view.getHtml();
        view.load();
        view.setEventBtn(function () {
            navigateTo("/employee");
        });
    } else if (view instanceof EmployeeTransfer) {
        document.querySelector("#app").innerHTML = view.getHtml();
        view.load();
        view.setEventBtn(function () {
            navigateTo("/employee");
        });
    } else if (view instanceof Customer) {
        document.querySelector("#app").innerHTML = view.getHtml();
        view.load(function () {
            navigateTo("/login");
        });
        let tenNhom=document.getElementById("tenNhom").value;
        if (tenNhom.toUpperCase()=="CHINHANH"){
            view.setEventBtn(function () {
                navigateTo("/customer");
            });
            view.setUndoEvent(function () {
                navigateTo("/customer");
            });
        }
        else{
            view.setLietKeEvent(function () {
                navigateTo("/customer");
            });
        }

    } else if (view instanceof CustomerUpdate) {
        document.querySelector("#app").innerHTML = view.getHtml();
        view.load();
        view.setEventBtn(function () {
            navigateTo("/customer");
        });
    } else if (view instanceof Money_Transfer) {
        document.querySelector("#app").innerHTML = view.getHtml();
        view.load(function () {
            navigateTo("/login");
        });
        view.setEventBtn(function () {
            navigateTo("/money-transfer");
        });

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

    } else if (view instanceof Deposit_Withdraw) {
        document.querySelector("#app").innerHTML = view.getHtml();
        view.load(function () {
            navigateTo("/login");
        });
        view.setEventBtn(function () {
            navigateTo("/deposit-withdraw");
        });

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

    } else if (view instanceof Account) {
        if (match.route.path.includes("accountDelete")) {
            view.setDeleteEvent(function () {
                navigateTo("/account");
            });
        } else {
            document.querySelector("#app").innerHTML = view.getHtml();
            view.load(function () {
                navigateTo("/login");
            });

            let tenNhom = document.getElementById("tenNhom").value;
            if (tenNhom.toUpperCase()=="CHINHANH"){
                view.setUndoEvent(function () {
                    navigateTo("/account");
                });
            }
            else{
                view.setEventBtn(function () {
                    navigateTo("/account");
                });
            }
        }
    }
    else if (view instanceof Stat) {
        document.querySelector("#app").innerHTML = view.getHtml();
        view.setEventBtn(function () {
            navigateTo(`/stat/${params.id}`);
        });
    }
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

window.addEventListener("popstate", router);

$.validator.addMethod("validateSoDT", function (value, element) {
    return this.optional(element) || /^0[0-9]{9,10}$/i.test(value);
}, "Hãy nhập đúng định dạng và k quá 11 số");

$.validator.addMethod("validateTiengViet", function (value, element) {
    return /^[^0-9`~!@#$%^&*()_=\\+<,.>\/?;:'"[{\]}|]+$/i.test(value);
}, "Hãy nhập chữ cái tiếng Việt");

$.validator.addMethod("validateNgayCap", function (value, element) {
    let ngayCap = new Date(value);
    let hienTai = new Date();
    return Math.abs(hienTai - ngayCap) >= 504911232000;
}, "Phải đủ 16 tuổi trở lên");

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
});

// window.onload = router;
