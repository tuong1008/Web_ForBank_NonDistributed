/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao.impl;

import dao.IDepositWithdrawDAO;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import mapper.DepositWithdrawMapper;
import model.GD_GoiRut;

/**
 *
 * @author Tuong
 */
public class DepositWithdrawDAO extends AbstractDAO<GD_GoiRut> implements IDepositWithdrawDAO{

    @Override
    public List<GD_GoiRut> getAll(HttpServletRequest req) {
        return query(req, "select * from GD_GoiRut", new DepositWithdrawMapper());
    }

    @Override
    public String insertDepositWithdraw(HttpServletRequest req, String soTK, String loaiGD, BigDecimal soTien, String maNV) {
        return crudAction(req, true,true, "exec SP_INSERT_GD_GoiRut ?, ?, ?, ?",
                soTK, loaiGD, soTien, maNV);
    }
    
}
