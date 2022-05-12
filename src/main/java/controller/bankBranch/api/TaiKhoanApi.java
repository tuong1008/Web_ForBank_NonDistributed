package controller.bankBranch.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.TaiKhoan;
import service.IAccountService;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(urlPatterns = {"/api-tk"})
public class TaiKhoanApi extends HttpServlet {
    @Inject
    IAccountService accountService;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        String cmnd = request.getParameter("cmnd");

        List<TaiKhoan> listTk = accountService.getAllTkByCMND(request, cmnd);
        mapper.writeValue(response.getOutputStream(), listTk);
    }
}
