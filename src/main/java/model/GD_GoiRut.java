/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class GD_GoiRut{
    private int maGD;
    private String soTK;
    private String loaiGD;
    private Timestamp ngayGD;
    private BigDecimal soTien;
    private String maNV;

    public int getMaGD() {
        return maGD;
    }

    public String getSoTK() {
        return soTK;
    }

    public String getLoaiGD() {
        return loaiGD;
    }

    public Timestamp getNgayGD() {
        return ngayGD;
    }

    public BigDecimal getSoTien() {
        return soTien;
    }

    public String getMaNV() {
        return maNV;
    }

    public void setMaGD(int maGD) {
        this.maGD = maGD;
    }

    public void setSoTK(String soTK) {
        this.soTK = soTK;
    }

    public void setLoaiGD(String loaiGD) {
        this.loaiGD = loaiGD;
    }

    public void setNgayGD(Timestamp ngayGD) {
        this.ngayGD = ngayGD;
    }

    public void setSoTien(BigDecimal soTien) {
        this.soTien = soTien;
    }

    public void setMaNV(String maNV) {
        this.maNV = maNV;
    }
    
}
