package service.impl;

import dao.IUserAccountDAO;
import model.UserAccount;
import service.IUserAccountService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

public class UserAccountService implements IUserAccountService {

    @Inject
    IUserAccountDAO userAccountDAO;

    @Override
    public UserAccount login(HttpServletRequest req, String user, String password) {
        // TODO Auto-generated method stub
        return userAccountDAO.login(req, user, password);
    }

    @Override
    public UserAccount getOne(HttpServletRequest req, String user) {
        // TODO Auto-generated method stub
        return userAccountDAO.getOne(req, user);
    }

    @Override
    public String insert(HttpServletRequest req, String userName, String password, String image, String khachHangID) {
        // TODO Auto-generated method stub
        return userAccountDAO.insert(req, userName, password, image, khachHangID);
    }

    @Override
    public String update(HttpServletRequest req, String userName, String password, String image) {
        // TODO Auto-generated method stub
        return null;
    }

}
