/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import model.GD_GoiRut;

/**
 *
 * @author Tuong
 */
public class DepositWithdrawMapper implements RowMapper<GD_GoiRut>{
    @Override
    public GD_GoiRut mapRow(ResultSet rs) {
        try {
            GD_GoiRut trans = new GD_GoiRut();
            trans.setMaGD(rs.getInt("MaGD"));
            trans.setSoTK(rs.getString("SoTK"));
            trans.setLoaiGD(rs.getString("LoaiGD"));
            trans.setNgayGD(rs.getTimestamp("NgayGD"));
            trans.setSoTien(rs.getBigDecimal("SoTien"));
            trans.setMaNV(rs.getString("MaNV"));
            return trans;
        } catch (SQLException e) {
            return null;
        }
    }
}
