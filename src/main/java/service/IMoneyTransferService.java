/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import model.GD_ChuyenTien;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Tuong
 */
public interface IMoneyTransferService {
    List<GD_ChuyenTien> getAll(HttpServletRequest req);

    String insertMoneyTransfer(HttpServletRequest req, GD_ChuyenTien trans);
}
