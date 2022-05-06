/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import model.User;

/**
 *
 * @author Tuong
 */
public class UserMapper implements RowMapper<User>{

    @Override
    public User mapRow(ResultSet rs) {
        try {
            User user = new User();
            user.setUserName(rs.getString(1));
            user.setHoTen(rs.getString(2));
            user.setMaCN(rs.getString(3));
            user.setTenNhom(rs.getString(4));
            return user;
        } catch (SQLException e) {
            return null;
        }
    }
    
}
