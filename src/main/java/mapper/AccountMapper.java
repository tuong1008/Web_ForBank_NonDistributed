/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapper;

import model.TaiKhoan;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Tuong
 */
public class AccountMapper implements RowMapper<TaiKhoan> {

    @Override
    public TaiKhoan mapRow(ResultSet rs) {
        try {
            TaiKhoan acc = new TaiKhoan();
            acc.setSoTK(rs.getString("SoTK"));
            acc.setCMND(rs.getString("CMND"));
            acc.setSoDu(rs.getBigDecimal("SoDu"));
            acc.setMaCN(rs.getString("MaCN"));
            acc.setNgayMoTK(rs.getTimestamp("NgayMoTK"));
            return acc;
        } catch (SQLException e) {
            return null;
        }
    }
}
