/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bankBranch.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.KhachHang;
import model.TaiKhoan;
import service.IAccountService;
import service.ICustomerService;
import service.IUserService;

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
import java.util.List;
import java.util.Stack;

/**
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-account"})
public class AccountAPI extends HttpServlet {
    @Inject
    IAccountService accountService;
    @Inject
    ICustomerService customerService;
    @Inject
    IUserService userService;


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        //nếu chuyển qua item khác trên nav thì clear stackToUndo
        HttpSession session = request.getSession();
        String currentPage = (String) session.getAttribute("currentPage");
        if (currentPage == null) {
            currentPage = request.getRequestURI();
            session.setAttribute("currentPage", currentPage);
            System.out.println("get " + session.getId());
        } else if (!request.getRequestURI().equals(currentPage)) {
            Stack<String> stackToUndo = (Stack<String>) session.getAttribute("stackToUndo");
            if (stackToUndo != null) stackToUndo.removeAllElements();
            session.setAttribute("stackToUndo", stackToUndo);
            currentPage = request.getRequestURI();
            session.setAttribute("currentPage", currentPage);
        }

        List<TaiKhoan> accs = accountService.getAll(request);
        mapper.writeValue(response.getOutputStream(), accs);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        JsonReader rdr = Json.createReader(req.getInputStream());
        JsonObject obj = rdr.readObject();
        HttpSession session = req.getSession();

        String soTK = obj.getJsonString("soTK").getString();

        TaiKhoan oldAcc = accountService.getOne(req, soTK);

        KhachHang oldCus = customerService.getOne(req, oldAcc.getCMND());

//        userService.loginAndChangeServer(req, currentUser.getServerName(), currentUser.getUser(), currentUser.getPassword());
        String messageAfterInsert = accountService.deleteAccount(req, soTK);
        JsonGenerator generator = Json.createGenerator(resp.getOutputStream());
        if (messageAfterInsert == null) {
            messageAfterInsert = "Xoá thành công!";
            //cmnd, ho, ten, diaChi, phai, ngayCap, soDT, maCN, soDu
            String action = "exec dbo.SP_INSERT_KHACHHANG '" + oldCus.getCMND() + "',N'" + oldCus.getHo() + "',N'" + oldCus.getTen() + "',\n" +
                    "N'" + oldCus.getDiaChi() + "',N'" + oldCus.getPhai() + "','" + oldCus.getNgayCap() + "',\n" +
                    "'" + oldCus.getSoDT() + "','" + oldAcc.getMaCN() + "','" + oldAcc.getSoDu() + "';";
            System.out.println(action);

            Stack<String> stackToUndo = (Stack<String>) session.getAttribute("stackToUndo");
            if (stackToUndo == null) {
                System.out.println("new Khoi tao stackToUndo");
                stackToUndo = new Stack<String>();
            }
            stackToUndo.add(action);
            session.setAttribute("stackToUndo", stackToUndo);
        }
        generator.writeStartObject()
                .write("message", messageAfterInsert)
                .writeEnd();
        generator.close();
    }


}
