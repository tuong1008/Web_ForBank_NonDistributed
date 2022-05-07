/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mapper;

import model.ChiNhanh;

import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * @author Tuong
 */
public class BranchMapper implements RowMapper<ChiNhanh> {

    @Override
    public ChiNhanh mapRow(ResultSet rs) {
        try {
            ChiNhanh branch = new ChiNhanh();
            branch.setMaCN(rs.getString("MaCN"));
            branch.setTenCN(rs.getString("TenCN"));
            branch.setDiaChi(rs.getString("DiaChi"));
            branch.setSoDT(rs.getString("SoDT"));
            return branch;
        } catch (SQLException e) {
            return null;
        }
    }

}
