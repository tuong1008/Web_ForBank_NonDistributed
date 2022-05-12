package controller.bankBranch.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import constant.SystemConstant;
import model.UserAccount;
import service.ICustomerService;
import service.IUserAccountService;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Servlet implementation class UserAPI
 */
@WebServlet(name = "user-account", urlPatterns = {"/user-account"})
public class UserAPI extends HttpServlet {
    private static final long serialVersionUID = 1L;
    @Inject
    ICustomerService customerService;
    @Inject
    IUserAccountService userAccountService;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        response.getWriter().append("Served at: ").append(request.getContextPath());
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        ObjectMapper mapper = new ObjectMapper();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        JsonReader rdr = Json.createReader(request.getInputStream());
        JsonObject obj = rdr.readObject();

        String CMND = obj.getJsonString("cmnd").getString();
        String ho = obj.getJsonString("ho").getString();
        String ten = obj.getJsonString("ten").getString();
        String diaChi = "";
        String phai = "Nam";
        String soDT = "0000000002";
        String maCN = "BENTHANH";
        String imageURL = "https://learntodroid.com/ezoimgfmt/i0.wp.com/learntodroid.com/wp-content/uploads/2020/05/Learn-to-Droid-480.png?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-1&ssl=1&w=480";
        String taiKhoan = obj.getJsonString("taiKhoan").getString();
        String pass = obj.getJsonString("matKhau").getString();
        String role = "ChiNhanh";
        BigDecimal soDu = new BigDecimal(0);


        Date date = new Date();
        SimpleDateFormat DateFor = new SimpleDateFormat("dd-MM-yyyy");
        String strNgayCap = DateFor.format(date);
        Timestamp ngayCap = null;
        try {
            ngayCap = new Timestamp(SystemConstant.ddMMyyyy.parse(strNgayCap).getTime());
        } catch (ParseException ex) {
            ex.printStackTrace();
        }
        customerService.insertCustomer(request, CMND, ho, ten, diaChi,
                phai, ngayCap, soDT, maCN, soDu);
        userAccountService.insert(request, taiKhoan, pass, imageURL, CMND);
        UserAccount userAccount = userAccountService.getOne(request, taiKhoan);
        mapper.writeValue(response.getOutputStream(), userAccount);

    }

}
