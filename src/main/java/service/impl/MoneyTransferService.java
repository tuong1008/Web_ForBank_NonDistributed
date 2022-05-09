/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.impl;

import dao.IMoneyTransferDAO;
import model.GD_ChuyenTien;
import service.IMoneyTransferService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Tuong
 */
public class MoneyTransferService implements IMoneyTransferService {

    @Inject
    IMoneyTransferDAO moneyTransferDAO;

    @Override
    public List<GD_ChuyenTien> getAll(HttpServletRequest req) {
        return moneyTransferDAO.getAll(req);
    }

    @Override
    public String insertMoneyTransfer(HttpServletRequest req, GD_ChuyenTien trans) {
        return moneyTransferDAO.insertMoneyTransfer(req, trans.getSoTK_Chuyen(),
                trans.getSoTien(), trans.getSoTK_Nhan(), trans.getMaNV());
    }

}
