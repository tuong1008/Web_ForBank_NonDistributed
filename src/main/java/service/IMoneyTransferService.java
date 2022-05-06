/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import model.GD_ChuyenTien;

/**
 *
 * @author Tuong
 */
public interface IMoneyTransferService {
    List<GD_ChuyenTien> getAll(HttpServletRequest req);
    String insertMoneyTransfer(HttpServletRequest req, GD_ChuyenTien trans);
}
