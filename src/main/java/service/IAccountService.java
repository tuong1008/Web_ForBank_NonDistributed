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
import model.TaiKhoan;
import model.ThongKeGD;

/**
 *
 * @author Tuong
 */
public interface IAccountService {
    List<TaiKhoan> getAll(HttpServletRequest req);
    public TaiKhoan getOne(HttpServletRequest req, String soTK);
    public TaiKhoan getByCMNDAndMaCN(HttpServletRequest req, String cmnd, String maCN);
    public String deleteAccount(HttpServletRequest req, String soTK);
    public List<ThongKeGD> thongKeGD(HttpServletRequest req, String soTK, Timestamp tuNgay, Timestamp denNgay);
    public List<TaiKhoan> thongKeTK(HttpServletRequest req,String maCN, Timestamp tuNgay, Timestamp denNgay);
    public List<TaiKhoan> thongKeTKAllServer(HttpServletRequest req, Timestamp tuNgay, Timestamp denNgay);
}
