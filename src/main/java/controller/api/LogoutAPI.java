/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.api;

import java.io.IOException;
import java.util.ResourceBundle;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.User;
import service.IUserService;

/**
 *
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-logout"})
public class LogoutAPI extends HttpServlet{

    @Inject
    IUserService userService;
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ResourceBundle resourceBundle = ResourceBundle.getBundle("db");
        HttpSession session = req.getSession();
        session.setAttribute("serverName", resourceBundle.getString("serverName"));
        session.setAttribute("user", resourceBundle.getString("user"));
        session.setAttribute("password", resourceBundle.getString("password"));

        session.removeAttribute("userInfo");
        
        JsonGenerator generator = Json.createGenerator(resp.getOutputStream());
        
            generator.writeStartObject()
                    .write("message", "Đăng xuất thành công!")
                    .writeEnd();
            generator.close();
    }
    
}
