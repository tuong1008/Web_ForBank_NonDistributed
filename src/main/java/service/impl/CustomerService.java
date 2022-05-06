/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.impl;

import dao.ICustomerDAO;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import model.KhachHang;
import service.ICustomerService;

/**
 *
 * @author Tuong
 */
public class CustomerService implements ICustomerService{

    @Inject
    ICustomerDAO customerDAO;
    
    @Override
    public List<KhachHang> getAll(HttpServletRequest req) {
        return customerDAO.getAll(req);
    }

    @Override
    public List<KhachHang> getAllByMaCN(HttpServletRequest req, String maCN) {
        return customerDAO.getAllByMaCN(req, maCN);
    }

    @Override
    public String insertCustomer(HttpServletRequest req, String CMND, String ho, String ten, String diaChi, String phai, Timestamp ngayCap, String soDT, String maCN, BigDecimal soDu) {
        return customerDAO.insertCustomer(req, CMND, ho, ten, diaChi, phai, ngayCap, soDT, maCN, soDu);
    }

    @Override
    public String updateCustomer(HttpServletRequest req, String CMND, String ho, String ten, String diaChi, String phai, Timestamp ngayCap, String soDT) {
        return customerDAO.updateCustomer(req, CMND, ho, ten, diaChi, phai, ngayCap, soDT);
    }

    @Override
    public KhachHang getOne(HttpServletRequest req, String cmnd) {
        return customerDAO.getOne(req, cmnd);
    }

    @Override
    public List<KhachHang> thongKeKH(HttpServletRequest req) {
        return customerDAO.thongKeKH(req);
    }
    
}
