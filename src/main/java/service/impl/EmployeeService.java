/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.impl;

import constant.SystemConstant;
import dao.IEmployeeDAO;
import dao.IUserDAO;
import model.NhanVien;
import model.User;
import service.IEmployeeService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Tuong
 */
public class EmployeeService implements IEmployeeService {

    @Inject
    IUserDAO userDAO;
    @Inject
    private IEmployeeDAO employeeDAO;

    @Override
    public List<NhanVien> getAll(HttpServletRequest req) {
        return employeeDAO.getAll(req);
    }

    @Override
    public String insertEmployee(HttpServletRequest req, String ho, String ten, String diaChi, String phai,
                                 String soDT, String maCN, String pass, String role) {
        return employeeDAO.insertEmployee(req, ho, ten, diaChi, phai, soDT, maCN, pass, role);
    }

    @Override
    public String updateEmployee(HttpServletRequest req, String maNV, String ho, String ten, String diaChi, String phai, String soDT) {
        return employeeDAO.updateEmployee(req, maNV, ho, ten, diaChi, phai, soDT);
    }

    @Override
    public String deleteEmployee(HttpServletRequest req, String maNV) {
        return employeeDAO.deleteEmployee(req, maNV);
    }

    @Override
    public NhanVien getOne(HttpServletRequest req, String maNV) {
        return employeeDAO.getOne(req, maNV);
    }

    @Override
    public NhanVien getBySDTAndMaCN(HttpServletRequest req, String soDT, String maCN) {
        return employeeDAO.getBySDTAndMaCN(req, soDT, maCN);
    }

    @Override
    public String transferEmployee(HttpServletRequest req, String maNVChuyenDi, String maCNChuyenDen) {
        NhanVien info = getOne(req, maNVChuyenDi);
        User currentEmployeeUser = userDAO.getOne(req, maNVChuyenDi);

        String result2 = insertEmployee(req, info.getHo(), info.getTen(), info.getDiaChi(), info.getPhai(),
                info.getSoDT(), maCNChuyenDen, SystemConstant.defaultPassword, currentEmployeeUser.getTenNhom());

        String result1 = deleteEmployee(req, maNVChuyenDi);
        if (result1 == null || result2 == null) {
            return null;
        } else {
            if (result1 != null) {
                return result1;
            }
            if (result2 != null) {
                return result2;
            }
            return "Lỗi không xác định";
        }
    }

    @Override
    public String undoTransferEmployee(HttpServletRequest req, String soDT, String maCNHienTai, String maCNChuyenDen) {
        NhanVien info = getBySDTAndMaCN(req, soDT, maCNChuyenDen); //nhân viên ở chi nhánh kia
        User thatEmployeeUser = userDAO.getOne(req, info.getMaNV());
        String result1 = deleteEmployee(req, info.getMaNV());

        String result2 = insertEmployee(req, info.getHo(), info.getTen(), info.getDiaChi(), info.getPhai(),
                info.getSoDT(), maCNHienTai, SystemConstant.defaultPassword, thatEmployeeUser.getTenNhom());

        if (result1 == null || result2 == null) {
            return null;
        } else {
            if (result1 != null) {
                return result1;
            }
            if (result2 != null) {
                return result2;
            }
            return "Lỗi không xác định";
        }
    }
}
