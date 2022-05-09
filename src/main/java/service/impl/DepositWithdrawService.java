/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.impl;

import dao.IDepositWithdrawDAO;
import model.GD_GoiRut;
import service.IDepositWithdrawService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Tuong
 */
public class DepositWithdrawService implements IDepositWithdrawService {

    @Inject
    IDepositWithdrawDAO depositWithdrawDAO;

    @Override
    public List<GD_GoiRut> getAll(HttpServletRequest req) {
        return depositWithdrawDAO.getAll(req);
    }

    @Override
    public String insertDepositWithdraw(HttpServletRequest req, GD_GoiRut trans) {
        return depositWithdrawDAO.insertDepositWithdraw(req, trans.getSoTK(),
                trans.getLoaiGD(), trans.getSoTien(), trans.getMaNV());
    }

}
