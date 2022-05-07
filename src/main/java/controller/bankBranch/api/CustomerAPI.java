/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bankBranch.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import constant.SystemConstant;
import model.KhachHang;
import model.TaiKhoan;
import model.User;
import service.IAccountService;
import service.ICustomerService;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;
import java.util.Stack;

/**
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-customer"})
public class CustomerAPI extends HttpServlet {
    @Inject
    ICustomerService customerService;

    @Inject
    IAccountService accountService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        //nếu chuyển qua item khác trên nav thì clear stackToUndo
        HttpSession session = req.getSession();
        String currentPage = (String) session.getAttribute("currentPage");
        if (currentPage == null) {
            currentPage = req.getRequestURI();
            session.setAttribute("currentPage", currentPage);
        } else if (!req.getRequestURI().equals(currentPage)) {
            Stack<String> stackToUndo = (Stack<String>) session.getAttribute("stackToUndo");
            if (stackToUndo != null) stackToUndo.removeAllElements();
            session.setAttribute("stackToUndo", stackToUndo);
            currentPage = req.getRequestURI();
            session.setAttribute("currentPage", currentPage);
        }

        String cmnd = req.getParameter("cmnd");
        if (cmnd != null) {
            KhachHang cus = customerService.getOne(req, cmnd);
            mapper.writeValue(resp.getOutputStream(), cus);
        } else {
            List<KhachHang> cuss = customerService.getAll(req);
            mapper.writeValue(resp.getOutputStream(), cuss);
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        JsonReader rdr = Json.createReader(req.getInputStream());
        JsonObject obj = rdr.readObject();

        String cmnd = obj.getJsonString("cmnd").getString();
        String ho = obj.getJsonString("ho").getString();
        String ten = obj.getJsonString("ten").getString();
        String diaChi = obj.getJsonString("diaChi").getString();
        String phai = obj.getJsonString("phai").getString();
        String strNgayCap = obj.getJsonString("ngayCap").getString();
        Timestamp ngayCap = null;
        try {
            ngayCap = new Timestamp(SystemConstant.ddMMyyyy.parse(strNgayCap).getTime());
        } catch (ParseException ex) {
            ex.printStackTrace();
        }
        String soDT = obj.getJsonString("soDT").getString();
        String maCN = ((User) req.getSession().getAttribute("userInfo")).getMaCN();
        BigDecimal soDu = new BigDecimal(obj.getJsonString("soDu").getString());

        String messageAfterInsert = customerService.insertCustomer(req, cmnd, ho, ten, diaChi,
                phai, ngayCap, soDT, maCN, soDu);
        JsonGenerator generator = Json.createGenerator(resp.getOutputStream());
        if (messageAfterInsert == null) {
            messageAfterInsert = "Thêm thành công!";
            TaiKhoan tkVuaThem = accountService.getByCMNDAndMaCN(req, cmnd, maCN);
            String action = "exec dbo.SP_DELETE_TAIKHOAN '" + tkVuaThem.getSoTK() + "';";

            Stack<String> stackToUndo = (Stack<String>) req.getSession().getAttribute("stackToUndo");
            if (stackToUndo == null) {
                stackToUndo = new Stack<String>();
            }
            stackToUndo.add(action);
            req.getSession().setAttribute("stackToUndo", stackToUndo);
        }
        generator.writeStartObject()
                .write("message", messageAfterInsert)
                .writeEnd();
        generator.close();
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        JsonReader rdr = Json.createReader(req.getInputStream());
        JsonObject obj = rdr.readObject();

        String cmnd = obj.getJsonString("cmnd").getString();
        String ho = obj.getJsonString("ho").getString();
        String ten = obj.getJsonString("ten").getString();
        String diaChi = obj.getJsonString("diaChi").getString();
        String phai = obj.getJsonString("phai").getString();
        String strNgayCap = obj.getJsonString("ngayCap").getString();
        Timestamp ngayCap = null;
        try {
            ngayCap = new Timestamp(SystemConstant.ddMMyyyy.parse(strNgayCap).getTime());
        } catch (ParseException ex) {
            ex.printStackTrace();
        }
        String soDT = obj.getJsonString("soDT").getString();

        KhachHang old = customerService.getOne(req, cmnd);
        String messageAfterInsert = customerService.updateCustomer(req, cmnd, ho, ten, diaChi,
                phai, ngayCap, soDT);
        JsonGenerator generator = Json.createGenerator(resp.getOutputStream());
        if (messageAfterInsert == null) {
            messageAfterInsert = "Cập nhật thành công!";
            String action = "UPDATE KhachHang\n" +
                    "SET HO = N'" + old.getHo() + "', TEN = N'" + old.getTen() + "', DIACHI = N'" + old.getDiaChi() + "', \n" +
                    "PHAI = N'" + old.getPhai() + "', NGAYCAP='" + old.getNgayCap() + "', SODT = '" + old.getSoDT() + "'\n" +
                    "WHERE CMND='" + cmnd + "';";
            System.out.println(action);

            Stack<String> stackToUndo = (Stack<String>) req.getSession().getAttribute("stackToUndo");
            if (stackToUndo == null) {
                stackToUndo = new Stack<String>();
            }
            stackToUndo.add(action);
            req.getSession().setAttribute("stackToUndo", stackToUndo);
        }
        generator.writeStartObject()
                .write("message", messageAfterInsert)
                .writeEnd();
        generator.close();
    }


}
