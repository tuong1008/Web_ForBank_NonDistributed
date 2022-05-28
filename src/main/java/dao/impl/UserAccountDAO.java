package dao.impl;

import dao.IUserAccountDAO;
import mapper.UserAccountMapper;
import model.UserAccount;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class UserAccountDAO extends AbstractDAO<UserAccount> implements IUserAccountDAO {

    @Override
    public UserAccount login(HttpServletRequest req, String user, String password) {
        List<UserAccount> list = query(req, "select * from USERACCOUNT where taikhoan=? and matkhau=?", new UserAccountMapper(), user, password);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public UserAccount getOne(HttpServletRequest req, String user) {
        List<UserAccount> list = query(req, "select * from USERACCOUNT where taikhoan=?", new UserAccountMapper(), user);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public String insert(HttpServletRequest req, String userName, String password, String image, String khachHangID) {
        insert(req, false, false, "insert into USERACCOUNT (TAIKHOAN,MATKHAU,IMAGEURL,KHACHHANGID) values(?,?,?,?)", userName, password, image, khachHangID);
        return null;
    }

    @Override
    public String update(HttpServletRequest req, String userName, String password, String image) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String updateImage(HttpServletRequest req, String imageUrl, String userId) {
        return crudAction(req, false, true, "UPDATE UserAccount SET IMAGEURL = ? WHERE id=?", imageUrl, userId);
    }

}
