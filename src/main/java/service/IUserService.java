/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import model.User;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Tuong
 */
public interface IUserService {
    User login(HttpServletRequest req, String user, String password);

    User getOne(HttpServletRequest req, String user);

    String insertLogin(HttpServletRequest req, String loginName, String password, String userName, String role);

    String updatePassword(HttpServletRequest req, String oldPassword, String password, String maNV);
}
