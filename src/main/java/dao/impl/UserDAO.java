/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao.impl;

import dao.IUserDAO;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import mapper.UserMapper;
import model.User;

/**
 *
 * @author Tuong
 */
public class UserDAO extends AbstractDAO<User> implements IUserDAO{

    @Override
    public User login(HttpServletRequest req, String user, String password) {
        HttpSession session = req.getSession();
        session.setAttribute("user", user);
        session.setAttribute("password", password);
        List<User> users= query(req, "exec dbo.SP_DANGNHAP ?", new UserMapper(), user);
        if (users==null){
            return null;
        }
        else{
            return users.get(0);
        }
    }

    @Override
    public String insertLogin(HttpServletRequest req, String loginName, String password, String userName, String role) {
        return crudAction(req, true,false, "exec dbo.SP_TAOLOGIN ?,?,?,?", loginName, password, userName, role);
    }

    @Override
    public User getOne(HttpServletRequest req, String user) {
        return query(req, "exec dbo.SP_DANGNHAP ?", new UserMapper(), user).get(0);
    }

    @Override
    public String updatePassword(HttpServletRequest req, String oldPassword, String password, String maNV) {
        return crudAction(req, false, true, "exec sp_password ?,?,?",oldPassword, password, maNV);
    }

    
    
}
