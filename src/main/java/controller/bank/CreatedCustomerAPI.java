/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bank;

import com.fasterxml.jackson.databind.ObjectMapper;
import constant.SystemConstant;
import java.io.IOException;
import java.util.List;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.KhachHang;
import model.User;
import service.ICustomerService;

/**
 *
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-bank-created-customer"})
public class CreatedCustomerAPI extends HttpServlet{
    @Inject
    ICustomerService customerService;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        
        String maCN = request.getHeader("maCN");
        List<KhachHang> cus;
        if (maCN.equals("getAll")){
            cus = customerService.getAll(request);
        } else {
            cus = customerService.getAllByMaCN(request, maCN);
        }
        
        mapper.writeValue(response.getOutputStream(), cus);
    }
}
