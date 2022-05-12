/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import dao.impl.AbstractDAO;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author tuong
 */
@WebServlet(urlPatterns = {"/test"})
public class TestConnDBAPi extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        
        Connection connection = AbstractDAO.getConnection("sa", "Admin1234.");

        String message = "";
        if (connection != null){
            message = "Ket noi DB thanh cong";
        } else {
            message = "Ket noi DB that bai";
        }

        JsonGenerator generator = Json.createGenerator(response.getOutputStream());
            generator.writeStartObject()
                    .write("message", message)
                    .writeEnd();
            generator.close();
    }
}
