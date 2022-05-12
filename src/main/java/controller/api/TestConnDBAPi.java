/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import dao.impl.AbstractDAO;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletContext;
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
        // request.setCharacterEncoding("UTF-8");
        // response.setContentType("application/json");
        
        // Connection connection = AbstractDAO.getConnection("sa", "Admin1234.");

        // String message = "";
        // if (connection != null){
        //     message = "Ket noi DB thanh cong";
        // } else {
        //     message = "Ket noi DB that bai";
        // }

        // JsonGenerator generator = Json.createGenerator(response.getOutputStream());
        //     generator.writeStartObject()
        //             .write("message", message)
        //             .writeEnd();
        //     generator.close();
        ServletContext sc = getServletContext();

        try (InputStream is = sc.getResourceAsStream("/images/duck.jpg")) {

            // it is the responsibility of the container to close output stream
            OutputStream os = response.getOutputStream();

            if (is == null) {

                response.setContentType("text/plain");
                os.write("Failed to send image".getBytes());
            } else {

                response.setContentType("image/jpeg");

                byte[] buffer = new byte[1024];
                int bytesRead;

                while ((bytesRead = is.read(buffer)) != -1) {

                    os.write(buffer, 0, bytesRead);
                }
            }
        }
    }
}
