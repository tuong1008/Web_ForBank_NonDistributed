/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import model.GD_ChuyenTien;

/**
 *
 * @author Tuong
 */
public interface IMoneyTransferDAO extends GenericDAO<GD_ChuyenTien>{
    public List<GD_ChuyenTien> getAll(HttpServletRequest req);
    String insertMoneyTransfer(HttpServletRequest req, String soTK_Chuyen, BigDecimal soTien, String soTK_Nhan, String maNV);
}
