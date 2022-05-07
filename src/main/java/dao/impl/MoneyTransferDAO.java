/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao.impl;

import dao.IMoneyTransferDAO;
import mapper.MoneyTransferMapper;
import model.GD_ChuyenTien;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;

/**
 * @author Tuong
 */
public class MoneyTransferDAO extends AbstractDAO<GD_ChuyenTien> implements IMoneyTransferDAO {

    @Override
    public List<GD_ChuyenTien> getAll(HttpServletRequest req) {
        return query(req, "select * from GD_CHUYENTIEN", new MoneyTransferMapper());
    }

    @Override
    public String insertMoneyTransfer(HttpServletRequest req, String soTK_Chuyen, BigDecimal soTien, String soTK_Nhan, String maNV) {
        return crudAction(req, true, true, "exec SP_INSERT_GD_CHUYENTIEN ?, ?, ?, ?",
                soTK_Chuyen, soTien, soTK_Nhan, maNV);
    }

}
