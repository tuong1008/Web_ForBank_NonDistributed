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
import model.GD_GoiRut;

/**
 *
 * @author Tuong
 */
public interface IDepositWithdrawDAO extends GenericDAO<GD_GoiRut>{
    public List<GD_GoiRut> getAll(HttpServletRequest req);
    String insertDepositWithdraw(HttpServletRequest req, String soTK, String loaiGD,
                                BigDecimal soTien, String maNV);
}
