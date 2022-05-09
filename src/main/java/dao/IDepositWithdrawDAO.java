/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import model.GD_GoiRut;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;

/**
 * @author Tuong
 */
public interface IDepositWithdrawDAO extends GenericDAO<GD_GoiRut> {
    List<GD_GoiRut> getAll(HttpServletRequest req);

    String insertDepositWithdraw(HttpServletRequest req, String soTK, String loaiGD,
                                 BigDecimal soTien, String maNV);
}
