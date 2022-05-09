/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapper;

import model.NhanVien;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Tuong
 */
public class EmployeeMapper implements RowMapper<NhanVien> {

    @Override
    public NhanVien mapRow(ResultSet resultSet) {
        try {
            NhanVien user = new NhanVien();
            user.setMaNV(resultSet.getString("MANV"));
            user.setHo(resultSet.getString("HO"));
            user.setTen(resultSet.getString("TEN"));
            user.setDiaChi(resultSet.getString("DIACHI"));
            user.setPhai(resultSet.getString("PHAI"));
            user.setSoDT(resultSet.getString("SODT"));
            user.setMaCN(resultSet.getString("MACN"));
            user.setTrangThaiXoa(resultSet.getInt("TrangThaiXoa"));
            return user;
        } catch (SQLException e) {
            return null;
        }
    }

}
