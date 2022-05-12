package dao.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import dao.IUserAccountDAO;
import mapper.UserAccountMapper;
import model.NhanVien;
import model.User;
import model.UserAccount;

public class UserAccountDAO extends AbstractDAO<UserAccount> implements IUserAccountDAO {

	@Override
	public UserAccount login(HttpServletRequest req, String user, String password) {
		// TODO Auto-generated method stub
		List<UserAccount>list= (List<UserAccount>) query(req, "select * from USERACCOUNT where taikhoan=? and matkhau=?",new UserAccountMapper() , user,password);
		return list.isEmpty()?null:list.get(0);
	}

	@Override
	public UserAccount getOne(HttpServletRequest req, String user) {
		// TODO Auto-generated method stub
		List<UserAccount>list= (List<UserAccount>) query(req, "select * from USERACCOUNT where taikhoan=?",new UserAccountMapper() , user);
		return list.isEmpty()?null:list.get(0);
	}

	@Override
	public String insert(HttpServletRequest req, String userName, String password, String image, String khachHangID) {
		// TODO Auto-generated method stub
		insert(req,false,false, "insert into USERACCOUNT (TAIKHOAN,MATKHAU,IMAGEURL,KHACHHANGID) values(?,?,?,?)", userName,password,image,khachHangID);
		return null;
	}

	@Override
	public String update(HttpServletRequest req, String userName, String password, String image) {
		// TODO Auto-generated method stub
		return null;
	}

}
