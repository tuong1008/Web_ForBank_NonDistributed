/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bankBranch.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.ChiNhanh;
import service.IBranchService;

import javax.inject.Inject;
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
@WebServlet(urlPatterns = {"/api-branch"})
public class BranchAPI extends HttpServlet {
    @Inject
    IBranchService branchService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        List<ChiNhanh> branchs;
        String currentSub = req.getParameter("currentSub");
        if (currentSub != null) {
            branchs = branchService.findOther(req, currentSub);
            mapper.writeValue(resp.getOutputStream(), branchs);
        } else {
            branchs = branchService.getAll(req);
            mapper.writeValue(resp.getOutputStream(), branchs);
        }
    }
}
