package dao;

import model.UserAccount;

import javax.servlet.http.HttpServletRequest;

public interface IUserAccountDAO {
    UserAccount login(HttpServletRequest req, String user, String password);

    UserAccount getOne(HttpServletRequest req, String user);

    UserAccount getOneBySTK(HttpServletRequest req, String stk);

    String insert(HttpServletRequest req, String userName, String password, String image, String khachHangID);

    String update(HttpServletRequest req, String userName, String password, String image);

    String updateImage(HttpServletRequest req, String imageUrl, String userId);

    String updateFirebaseToken(HttpServletRequest req, String firebaseToken, String userId);
}
