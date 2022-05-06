/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class GD_ChuyenTien{
    private int maGD;
    private String soTK_Chuyen;
    private Timestamp ngayGD;
    private BigDecimal soTien;
    private String soTK_Nhan;
    private String maNV;

    public int getMaGD() {
        return maGD;
    }

    public String getSoTK_Chuyen() {
        return soTK_Chuyen;
    }

    public Timestamp getNgayGD() {
        return ngayGD;
    }

    public BigDecimal getSoTien() {
        return soTien;
    }

    public String getSoTK_Nhan() {
        return soTK_Nhan;
    }

    public String getMaNV() {
        return maNV;
    }

    public void setMaGD(int maGD) {
        this.maGD = maGD;
    }

    public void setSoTK_Chuyen(String soTK_Chuyen) {
        this.soTK_Chuyen = soTK_Chuyen;
    }

    public void setNgayGD(Timestamp ngayGD) {
        this.ngayGD = ngayGD;
    }

    public void setSoTien(BigDecimal soTien) {
        this.soTien = soTien;
    }

    public void setSoTK_Nhan(String soTK_Nhan) {
        this.soTK_Nhan = soTK_Nhan;
    }

    public void setMaNV(String maNV) {
        this.maNV = maNV;
    }
    
}
