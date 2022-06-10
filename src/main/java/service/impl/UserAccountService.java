package service.impl;

import dao.IUserAccountDAO;
import java.util.List;
import model.UserAccount;
import service.IUserAccountService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import mapper.UserAccountMapper;

public class UserAccountService implements IUserAccountService {

    @Inject
    IUserAccountDAO userAccountDAO;

    @Override
    public UserAccount login(HttpServletRequest req, String user, String password) {
        return userAccountDAO.login(req, user, password);
    }

    @Override
    public UserAccount getOne(HttpServletRequest req, String user) {
        return userAccountDAO.getOne(req, user);
    }

    @Override
    public UserAccount getOneBySTK(HttpServletRequest req, String stk) {
        
        return userAccountDAO.getOneBySTK(req, stk);
    }

    @Override
    public String insert(HttpServletRequest req, String userName, String password, String image, String khachHangID) {
        return userAccountDAO.insert(req, userName, password, image, khachHangID);
    }

    @Override
    public String update(HttpServletRequest req, String userName, String password, String image) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String updateImage(HttpServletRequest req, String imageUrl, String userId) {
        return userAccountDAO.updateImage(req, imageUrl, userId);
    }

    @Override
    public String updateFirebaseToken(HttpServletRequest req, String firebaseToken, String userId){
        return userAccountDAO.updateFirebaseToken(req, firebaseToken, userId);
    }
}
