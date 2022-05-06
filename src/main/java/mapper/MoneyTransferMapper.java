/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import model.GD_ChuyenTien;

/**
 *
 * @author Tuong
 */
public class MoneyTransferMapper implements RowMapper<GD_ChuyenTien>{

    @Override
    public GD_ChuyenTien mapRow(ResultSet rs) {
        try {
            GD_ChuyenTien trans = new GD_ChuyenTien();
            trans.setMaGD(rs.getInt("MaGD"));
            trans.setSoTK_Chuyen(rs.getString("soTK_Chuyen"));
            trans.setNgayGD(rs.getTimestamp("NgayGD"));
            trans.setSoTien(rs.getBigDecimal("SoTien"));
            trans.setSoTK_Nhan(rs.getString("SoTK_Nhan"));
            trans.setMaNV(rs.getString("MaNV"));
            return trans;
        } catch (SQLException e) {
            return null;
        }
    }
    
}
