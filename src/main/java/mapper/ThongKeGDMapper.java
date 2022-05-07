/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapper;

import model.ThongKeGD;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Tuong
 */
public class ThongKeGDMapper implements RowMapper<ThongKeGD> {

    @Override
    public ThongKeGD mapRow(ResultSet rs) {
        try {
            ThongKeGD tran = new ThongKeGD();
            tran.setBalanceBefore(rs.getBigDecimal("balancebefore"));
            tran.setNgayGD(rs.getTimestamp("ngaygd"));
            tran.setLoaiGD(rs.getString("loaigd"));
            tran.setSoTien(rs.getBigDecimal("sotien"));
            tran.setBalanceAfter(rs.getBigDecimal("balanceafter"));
            return tran;
        } catch (SQLException e) {
            return null;
        }
    }

}
