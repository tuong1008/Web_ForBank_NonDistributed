/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bankBranch.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import constant.SystemConstant;
import model.NhanVien;
import model.User;
import service.IEmployeeService;
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
import java.util.List;
import java.util.Stack;

/**
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-employee"})
public class EmployeeAPI extends HttpServlet {

    @Inject
    IEmployeeService employeeService;
    @Inject
    IUserService userService;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        //nếu chuyển qua item khác trên nav thì clear stackToUndo
        HttpSession session = request.getSession();
        String currentPage = (String) session.getAttribute("currentPage");
        if (currentPage == null) {
            currentPage = request.getRequestURI();
            session.setAttribute("currentPage", currentPage);

        } else if (!request.getRequestURI().equals(currentPage)) {
            Stack<String> stackToUndo = (Stack<String>) session.getAttribute("stackToUndo");
            if (stackToUndo != null) stackToUndo.removeAllElements();
            session.setAttribute("stackToUndo", stackToUndo);
            currentPage = request.getRequestURI();
            session.setAttribute("currentPage", currentPage);
        }

        String maNV = request.getParameter("maNV");
        if (maNV != null) {
            NhanVien employeeModel = employeeService.getOne(request, maNV);
            mapper.writeValue(response.getOutputStream(), employeeModel);
        } else {
            List<NhanVien> employeeModels = employeeService.getAll(request);
            mapper.writeValue(response.getOutputStream(), employeeModels);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        HttpSession session = req.getSession();
        User createBy = (User) session.getAttribute("userInfo");
        System.out.println("Add employee session: " + session.getId());
        JsonReader rdr = Json.createReader(req.getInputStream());
        JsonObject obj = rdr.readObject();
        String ho = obj.getJsonString("ho").getString();
        String ten = obj.getJsonString("ten").getString();
        String diaChi = obj.getJsonString("diaChi").getString();
        String phai = obj.getJsonString("phai").getString();
        String soDT = obj.getJsonString("soDT").getString();
        String maCN = createBy.getMaCN();
        String pass = obj.getJsonString("pass").getString();
        String role = createBy.getTenNhom();

        String messageAfterInsert = employeeService.insertEmployee(req, ho, ten, diaChi,
                phai, soDT, maCN, pass, role);

        JsonGenerator generator = Json.createGenerator(resp.getOutputStream());

        if (messageAfterInsert == null) {
            messageAfterInsert = "Thêm thành công!";

            NhanVien vuaThem = employeeService.getBySDTAndMaCN(req, soDT, maCN);
            String action = "exec dbo.SP_DELETE_NHANVIEN '" + vuaThem.getMaNV() + "';";
            System.out.println(action);
            Stack<String> stackToUndo = (Stack<String>) req.getSession().getAttribute("stackToUndo");
            if (stackToUndo == null) {
                stackToUndo = new Stack<String>();
            }
            stackToUndo.add(action);
            req.getSession().setAttribute("stackToUndo", stackToUndo);
        }
        generator.writeStartObject()
                .write("message", messageAfterInsert)
                .writeEnd();
        generator.close();
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        JsonReader rdr = Json.createReader(req.getInputStream());
        JsonObject obj = rdr.readObject();

        if (req.getParameter("action") == null) {
            String maNV = obj.getJsonString("maNV").getString();
            String ho = obj.getJsonString("ho").getString();
            String ten = obj.getJsonString("ten").getString();
            String diaChi = obj.getJsonString("diaChi").getString();
            String phai = obj.getJsonString("phai").getString();
            String soDT = obj.getJsonString("soDT").getString();

            NhanVien old = employeeService.getOne(req, maNV);
            String messageAfterInsert = employeeService.updateEmployee(req, maNV, ho, ten, diaChi,
                    phai, soDT);


            if (messageAfterInsert == null) {
                messageAfterInsert = "Thêm thành công!";
                //maNV, ho, ten, diaChi, phai, soDT
                String action = "exec dbo.SP_UPDATE_NHANVIEN '" + old.getMaNV() + "', N'" + old.getHo() + "', N'" + old.getTen() + "',\n" +
                        " N'" + old.getDiaChi() + "', N'" + old.getPhai() + "', '" + old.getSoDT() + "';";
                System.out.println(action);
                Stack<String> stackToUndo = (Stack<String>) req.getSession().getAttribute("stackToUndo");
                if (stackToUndo == null) {
                    stackToUndo = new Stack<String>();
                }
                stackToUndo.add(action);
                req.getSession().setAttribute("stackToUndo", stackToUndo);
            }

            JsonGenerator generator = Json.createGenerator(resp.getOutputStream());
            generator.writeStartObject()
                    .write("message", messageAfterInsert)
                    .writeEnd();
            generator.close();
        } else {
            String maNV = obj.getJsonString("maNV").getString();
            String maCNChuyenDen = obj.getJsonString("maCNChuyenDen").getString();
            NhanVien currentEmp = employeeService.getOne(req, maNV);

            String messageAfterInsert = employeeService.transferEmployee(req, maNV, maCNChuyenDen);

            if (messageAfterInsert == null) {
                messageAfterInsert = "Chuyển nhân viên thành công!";
                //maNV, ho, ten, diaChi, phai, soDT
                HttpSession session = req.getSession();
                User currentUser = (User) session.getAttribute("userInfo");
                String maCNHienTai = currentUser.getMaCN();
//                String serverHienTai = currentUser.getServerName();

                String action = currentEmp.getSoDT() + "&" + maCNHienTai + "&" + maCNChuyenDen;
                System.out.println(action);
                Stack<String> stackToUndo = (Stack<String>) req.getSession().getAttribute("stackToUndo");
                if (stackToUndo == null) {
                    stackToUndo = new Stack<String>();
                }
                stackToUndo.add(action);
                req.getSession().setAttribute("stackToUndo", stackToUndo);
            }

            JsonGenerator generator = Json.createGenerator(resp.getOutputStream());
            generator.writeStartObject()
                    .write("message", messageAfterInsert)
                    .writeEnd();
            generator.close();
        }

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        JsonReader rdr = Json.createReader(req.getInputStream());
        JsonObject obj = rdr.readObject();

        String maNV = obj.getJsonString("maNV").getString();

        NhanVien old = employeeService.getOne(req, maNV);
        User oldUser = userService.getOne(req, maNV);
        String messageAfterInsert = employeeService.deleteEmployee(req, maNV);

        JsonGenerator generator = Json.createGenerator(resp.getOutputStream());

        if (messageAfterInsert == null) {
            messageAfterInsert = "Xóa thành công!";
            //ho, ten, diaChi, phai, soDT, maCN, pass, role
            String action = "exec dbo.SP_INSERT_NHANVIEN N'" + old.getHo() + "', N'" + old.getTen() + "', N'" + old.getDiaChi() + "', \n" +
                    "N'" + old.getPhai() + "', '" + old.getSoDT() + "', '" + old.getMaCN() + "', '" + SystemConstant.defaultPassword + "', '" + oldUser.getTenNhom() + "';";
            System.out.println(action);
            Stack<String> stackToUndo = (Stack<String>) req.getSession().getAttribute("stackToUndo");
            if (stackToUndo == null) {
                stackToUndo = new Stack<String>();
            }
            stackToUndo.add(action);
            req.getSession().setAttribute("stackToUndo", stackToUndo);
        }
        generator.writeStartObject()
                .write("message", messageAfterInsert)
                .writeEnd();
        generator.close();
    }
}
