/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bank;

import com.fasterxml.jackson.databind.ObjectMapper;
import constant.SystemConstant;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.ThongKeGD;
import service.IAccountService;

/**
 *
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-bank-account-statement"})
public class AccountStatementAPI extends HttpServlet{
    @Inject
    IAccountService accountService;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        
        String soTK = request.getParameter("soTK");
        Timestamp tuNgay=null;
        Timestamp denNgay=null;
        try {
            tuNgay = new Timestamp(SystemConstant.yyyyMMdd.parse(request.getParameter("tuNgay")).getTime());
            denNgay = new Timestamp(SystemConstant.yyyyMMdd.parse(request.getParameter("denNgay")).getTime());
        } catch (ParseException ex) {
            ex.printStackTrace();
        }
        
        List<ThongKeGD> trans = accountService.thongKeGD(request, soTK, tuNgay, denNgay);
        mapper.writeValue(response.getOutputStream(), trans);
    }
}
