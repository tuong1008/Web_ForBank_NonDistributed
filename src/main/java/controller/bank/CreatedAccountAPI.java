/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bank;

import com.fasterxml.jackson.databind.ObjectMapper;
import constant.SystemConstant;
import model.TaiKhoan;
import service.IAccountService;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;

/**
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-bank-created-account"})
public class CreatedAccountAPI extends HttpServlet {

    @Inject
    IAccountService accountService;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        String maCN = request.getParameter("maCN");

        Timestamp tuNgay = null;
        Timestamp denNgay = null;
        try {
            tuNgay = new Timestamp(SystemConstant.yyyyMMdd.parse(request.getParameter("tuNgay")).getTime());
            denNgay = new Timestamp(SystemConstant.yyyyMMdd.parse(request.getParameter("denNgay")).getTime());
        } catch (ParseException ex) {
            ex.printStackTrace();
        }

        List<TaiKhoan> accs = null;
        if (maCN.equals("getAll")) {
            accs = accountService.thongKeTKAllServer(request, tuNgay, denNgay);
        } else {
            accs = accountService.thongKeTK(request, maCN, tuNgay, denNgay);
        }
        mapper.writeValue(response.getOutputStream(), accs);
    }
}
