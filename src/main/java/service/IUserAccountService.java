/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import model.UserAccount;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Tuong
 */
public interface IUserAccountService {

    UserAccount login(HttpServletRequest req, String user, String password);

    UserAccount getOne(HttpServletRequest req, String user);

    String insert(HttpServletRequest req, String userName, String password, String image, String khachHangID);

    String update(HttpServletRequest req, String userName, String password, String image);

    String updateImage(HttpServletRequest req, String imageUrl, String userId);
}
