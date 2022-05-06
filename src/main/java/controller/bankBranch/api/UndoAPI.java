/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bankBranch.api;

import dao.impl.AbstractDAO;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Stack;
import javax.inject.Inject;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import service.IEmployeeService;

/**
 *
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-undo"})
public class UndoAPI extends HttpServlet{
    @Inject
    IEmployeeService employeeService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
	resp.setContentType("application/json");
        
        HttpSession session = req.getSession();
        Connection connection = AbstractDAO.getConnection(session.getAttribute("user").toString(),
                                                                session.getAttribute("password").toString());
        String message = null;
        try {
            Stack<String> stackToUndo =(Stack<String>) session.getAttribute("stackToUndo");
            if (!stackToUndo.isEmpty()){
                String sql = stackToUndo.pop();
                PreparedStatement statement = connection.prepareStatement(sql);

                if (sql.contains("SP")){
                    statement.executeQuery();
                }
                else if (sql.contains("&")){
                    String[] maNVServerMaCN = sql.split("&");
                    String result = employeeService.undoTransferEmployee(req, maNVServerMaCN[0], maNVServerMaCN[1],
                                                                         maNVServerMaCN[2]);
                    if (result==null) message = "Hoàn tác thành công";
                    else message = result;
                }
                else{
                    statement.executeUpdate();
                }
                
                //thông báo về
                if (stackToUndo.isEmpty()){
                    message = "Hết thao tác";
                }
                else{
                    message = "Hoàn tác thành công";
                }
                    
            }
        } catch (SQLException ex) {
            message = ex.getMessage();
        } finally{
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
            JsonGenerator generator = Json.createGenerator(resp.getOutputStream());
            generator.writeStartObject()
                    .write("message", message)
                    .writeEnd();
            generator.close();
    }
    
    
}
