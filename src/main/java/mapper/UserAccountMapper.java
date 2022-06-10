/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapper;

import model.UserAccount;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Tuong
 */
public class UserAccountMapper implements RowMapper<UserAccount> {

    @Override
    public UserAccount mapRow(ResultSet rs) {
        try {
            UserAccount user = new UserAccount();
            user.setId(rs.getInt("id"));
            user.setTaiKhoan(rs.getString("TAIKHOAN"));
            user.setMatKhau(rs.getString("MATKHAU"));
            user.setKhachHangID(rs.getString("KHACHHANGID"));
            user.setImageUrl(rs.getString("IMAGEURL"));
            user.setFirebaseToken(rs.getString("FIREBASETOKEN"));
            return user;
        } catch (SQLException e) {
            return null;
        }
    }
}
