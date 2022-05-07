/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.User;
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

/**
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-user-login"})
public class UserAPI extends HttpServlet {

    @Inject
    IUserService userService;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        ObjectMapper mapper = new ObjectMapper();
        String user = request.getHeader("user");
        String password = request.getHeader("password");
        User userInfo = userService.login(request, user, password);
        //save useInfo in login
        if (userInfo != null) {
            HttpSession session = request.getSession();
            session.setAttribute("userInfo", userInfo);
            System.out.println("Login session: " + session.getId());
            mapper.writeValue(response.getOutputStream(), userInfo);
        } else {
            JsonGenerator generator = Json.createGenerator(response.getOutputStream());

            generator.writeStartObject()
                    .write("message", "Sai tài khoản hoặc mật khẩu!")
                    .writeEnd();
            generator.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        JsonReader rdr = Json.createReader(request.getInputStream());
        JsonObject obj = rdr.readObject();

        String loginName = obj.getJsonString("loginName").getString();
        String password = obj.getJsonString("password").getString();
        String userName = obj.getJsonString("userName").getString();
        String role = obj.getJsonString("role").getString();

        String messageAfterInsertLogin = userService.insertLogin(request, loginName,
                password,
                userName,
                role);

        JsonGenerator generator = Json.createGenerator(response.getOutputStream());

        generator.writeStartObject()
                .write("message", messageAfterInsertLogin)
                .writeEnd();
        generator.close();
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        JsonReader rdr = Json.createReader(request.getInputStream());
        JsonObject obj = rdr.readObject();

        String oldPass = obj.getJsonString("old_pass").getString();
        String pass = obj.getJsonString("pass").getString();

        HttpSession session = request.getSession();

        String messageAfterInsertLogin = userService.updatePassword(request, oldPass, pass, session.getAttribute("user").toString());


        if (messageAfterInsertLogin == null) {
            messageAfterInsertLogin = "Đổi mật khẩu thành công!";
        } else {
            messageAfterInsertLogin = "Mật khẩu sai";
        }


        JsonGenerator generator = Json.createGenerator(response.getOutputStream());

        generator.writeStartObject()
                .write("message", messageAfterInsertLogin)
                .writeEnd();
        generator.close();
    }


}
