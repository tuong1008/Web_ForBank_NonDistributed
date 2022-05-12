/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import model.TaiKhoan;
import model.ThongKeGD;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;

/**
 * @author Tuong
 */
public interface IAccountService {
    List<TaiKhoan> getAll(HttpServletRequest req);

    TaiKhoan getOne(HttpServletRequest req, String soTK);

    TaiKhoan getByCMNDAndMaCN(HttpServletRequest req, String cmnd, String maCN);

    String deleteAccount(HttpServletRequest req, String soTK);

    List<ThongKeGD> thongKeGD(HttpServletRequest req, String soTK, Timestamp tuNgay, Timestamp denNgay);

    List<TaiKhoan> thongKeTK(HttpServletRequest req, String maCN, Timestamp tuNgay, Timestamp denNgay);

    List<TaiKhoan> thongKeTKAllServer(HttpServletRequest req, Timestamp tuNgay, Timestamp denNgay);

    List<TaiKhoan> getAllTkByCMND(HttpServletRequest req, String cmnd);
}
