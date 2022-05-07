/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.impl;

import dao.IUserDAO;
import model.User;
import service.IUserService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Tuong
 */
public class UserService implements IUserService {

    @Inject
    IUserDAO userDAO;

    @Override
    public User login(HttpServletRequest req, String user, String password) {
        User userInfo = userDAO.login(req, user, password);
        if (userInfo == null) {
            System.out.println("Sai tai khoan, mat khau");
            return null;
        } else if (userInfo.getHoTen() == null) {
            System.out.println("Tai khoan da bi xoa");
            return null;
        } else {
            userInfo.setUser(user);
            userInfo.setPassword(password);

            return userInfo;
        }
    }

    @Override
    public String insertLogin(HttpServletRequest req, String loginName, String password, String userName, String role) {
        String result = userDAO.insertLogin(req, loginName, password, userName, role);
        if (result != null) {
            return "Thêm login thất bại!";
        } else {
            return "Thêm login thành công!";
        }
    }

    @Override
    public User getOne(HttpServletRequest req, String user) {
        return userDAO.getOne(req, user);
    }

    @Override
    public String updatePassword(HttpServletRequest req, String oldPassword, String password, String maNV) {
        return userDAO.updatePassword(req, oldPassword, password, maNV);
    }

}
