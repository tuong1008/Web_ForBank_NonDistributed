package controller.bankBranch.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.UserAccount;
import service.IUserAccountService;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class AuthenticationAPI
 */
@WebServlet("/user-login")
public class AuthenticationAPI extends HttpServlet {
    private static final long serialVersionUID = 1L;
    @Inject
    IUserAccountService userAccountService;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public AuthenticationAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        JsonReader rdr = Json.createReader(request.getInputStream());
        JsonObject obj = rdr.readObject();

        String taiKhoan = obj.getJsonString("taiKhoan").getString();
        String matKhau = obj.getJsonString("matKhau").getString();

        System.out.println(taiKhoan + matKhau);

        UserAccount user = userAccountService.login(request, taiKhoan, matKhau);

        mapper.writeValue(response.getOutputStream(), user);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

}
