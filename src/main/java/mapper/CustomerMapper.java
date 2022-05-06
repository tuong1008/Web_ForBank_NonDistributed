/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import model.KhachHang;

/**
 *
 * @author Tuong
 */
public class CustomerMapper implements RowMapper<KhachHang>{

    @Override
    public KhachHang mapRow(ResultSet rs) {
        try {
            KhachHang cus = new KhachHang();
            cus.setCMND(rs.getString("CMND"));
            cus.setHo(rs.getString("Ho"));
            cus.setTen(rs.getString("Ten"));
            cus.setDiaChi(rs.getString("DiaChi"));
            cus.setPhai(rs.getString("Phai"));
            cus.setNgayCap(rs.getTimestamp("NgayCap"));
            cus.setSoDT(rs.getString("SoDT"));
            cus.setMaCN(rs.getString("MaCN"));
            return cus;
        } catch (SQLException e) {
            return null;
        }
    }
    
}
