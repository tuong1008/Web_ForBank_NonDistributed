/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao.impl;

import dao.IEmployeeDAO;
import mapper.EmployeeMapper;
import model.NhanVien;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Tuong
 */
public class EmployeeDAO extends AbstractDAO<NhanVien> implements IEmployeeDAO {

    @Override
    public List<NhanVien> getAll(HttpServletRequest req) {
        return query(req, "select * from NhanVien", new EmployeeMapper());
    }

    @Override
    public String insertEmployee(HttpServletRequest req, String ho, String ten, String diaChi, String phai,
                                 String soDT, String maCN, String pass, String role) {
        return crudAction(req, true, false, "exec dbo.SP_INSERT_NHANVIEN ?, ?, ?, ?, ?, ?, ?, ?;",
                ho, ten, diaChi, phai, soDT, maCN, pass, role);
    }

    @Override
    public String updateEmployee(HttpServletRequest req, String maNV, String ho, String ten, String diaChi, String phai, String soDT) {
        return crudAction(req, true, true, "exec dbo.SP_UPDATE_NHANVIEN ?, ?, ?, ?, ?, ?;",
                maNV, ho, ten, diaChi, phai, soDT);
    }

    @Override
    public String deleteEmployee(HttpServletRequest req, String maNV) {
        return crudAction(req, true, false, "exec dbo.SP_DELETE_NHANVIEN ?;", maNV);
    }

    @Override
    public NhanVien getOne(HttpServletRequest req, String maNV) {
        return query(req, "select * from NhanVien where MANV=?", new EmployeeMapper(), maNV).get(0);
    }

    @Override
    public NhanVien getBySDTAndMaCN(HttpServletRequest req, String soDT, String maCN) {
        return query(req, "select * from NhanVien where SODT=? and MACN=?", new EmployeeMapper(), soDT, maCN).get(0);
    }


}
