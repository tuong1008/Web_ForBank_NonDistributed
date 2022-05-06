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
import model.KhachHang;

/**
 *
 * @author Tuong
 */
public interface ICustomerService {
    List<KhachHang> getAll(HttpServletRequest req);
    List<KhachHang> getAllByMaCN(HttpServletRequest req, String maCN);
    KhachHang getOne(HttpServletRequest req, String cmnd);
    String insertCustomer(HttpServletRequest req, String CMND, String ho, String ten, String diaChi, String phai, Timestamp ngayCap, String soDT, String maCN, BigDecimal soDu);
    String updateCustomer(HttpServletRequest req, String CMND, String ho, String ten, String diaChi, 
                    String phai, Timestamp ngayCap, String soDT);
    List<KhachHang> thongKeKH(HttpServletRequest req);
}
