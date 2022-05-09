/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import model.GD_ChuyenTien;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;

/**
 * @author Tuong
 */
public interface IMoneyTransferDAO extends GenericDAO<GD_ChuyenTien> {
    List<GD_ChuyenTien> getAll(HttpServletRequest req);

    String insertMoneyTransfer(HttpServletRequest req, String soTK_Chuyen, BigDecimal soTien, String soTK_Nhan, String maNV);
}
