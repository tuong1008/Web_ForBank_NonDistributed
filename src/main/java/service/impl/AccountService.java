/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.impl;

import dao.IAccountDAO;
import model.TaiKhoan;
import model.ThongKeGD;
import service.IAccountService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;

/**
 * @author Tuong
 */
public class AccountService implements IAccountService {

    @Inject
    IAccountDAO accountDAO;

    @Override
    public List<TaiKhoan> getAll(HttpServletRequest req) {
        return accountDAO.getAll(req);
    }

    @Override
    public String deleteAccount(HttpServletRequest req, String soTK) {
        return accountDAO.deleteAccount(req, soTK);
    }

    @Override
    public TaiKhoan getByCMNDAndMaCN(HttpServletRequest req, String cmnd, String maCN) {
        return accountDAO.getByCMNDAndMaCN(req, cmnd, maCN);
    }

    @Override
    public TaiKhoan getOne(HttpServletRequest req, String soTK) {
        return accountDAO.getOne(req, soTK);
    }

    @Override
    public List<ThongKeGD> thongKeGD(HttpServletRequest req, String soTK, Timestamp tuNgay, Timestamp denNgay) {
        return accountDAO.thongKeGD(req, soTK, tuNgay, denNgay);
    }

    @Override
    public List<TaiKhoan> thongKeTK(HttpServletRequest req, String maCN, Timestamp tuNgay, Timestamp denNgay) {
        return accountDAO.thongKeTK(req, maCN, tuNgay, denNgay);
    }

    @Override
    public List<TaiKhoan> thongKeTKAllServer(HttpServletRequest req, Timestamp tuNgay, Timestamp denNgay) {
        return accountDAO.thongKeTKAllServer(req, tuNgay, denNgay);
    }

    @Override
    public List<TaiKhoan> getAllTkByCMND(HttpServletRequest req, String cmnd) {
        return accountDAO.getAllTkByCMND(req, cmnd);
    }
}
