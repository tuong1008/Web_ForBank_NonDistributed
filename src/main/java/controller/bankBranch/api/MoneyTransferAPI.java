/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bankBranch.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.GD_ChuyenTien;
import model.User;
import service.IMoneyTransferService;
import utils.HttpUtil;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-money-tranfer"})
public class MoneyTransferAPI extends HttpServlet {
    @Inject
    IMoneyTransferService moneyTransferService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        List<GD_ChuyenTien> accs = moneyTransferService.getAll(req);
        mapper.writeValue(resp.getOutputStream(), accs);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        GD_ChuyenTien trans = HttpUtil.of(req.getReader()).toModel(GD_ChuyenTien.class);
        trans.setMaNV(((User) req.getSession().getAttribute("userInfo")).getUserName());
        String messageAfterInsert = moneyTransferService.insertMoneyTransfer(req, trans);
        JsonGenerator generator = Json.createGenerator(resp.getOutputStream());
        if (messageAfterInsert == null) {
            messageAfterInsert = "Thêm thành công!";
        }
        generator.writeStartObject()
                .write("message", messageAfterInsert)
                .writeEnd();
        generator.close();
    }
}
