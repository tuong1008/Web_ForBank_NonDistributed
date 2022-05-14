/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller.api;

import dao.impl.AbstractDAO;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.Part;

/**
 * @author tuong
 */
@WebServlet(urlPatterns = {"/test"})
@MultipartConfig(fileSizeThreshold = 1024 * 1024,
  maxFileSize = 1024 * 1024 * 5, 
  maxRequestSize = 1024 * 1024 * 5 * 5)
public class TestConnDBAPi extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
         request.setCharacterEncoding("UTF-8");
         response.setContentType("application/json");

         String user = AbstractDAO.resourceBundle.getString("user");
         String password = AbstractDAO.resourceBundle.getString("password");

         Connection connection = AbstractDAO.getConnection(user, password);

         String message = "";
         if (connection != null) {
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
