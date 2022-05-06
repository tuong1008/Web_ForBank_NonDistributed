/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class TaiKhoan{
    private String soTK;
    private String cmnd;
    private BigDecimal soDu;
    private String maCN;
    private Timestamp ngayMoTK;

    public String getSoTK() {
        return soTK;
    }

    public String getCMND() {
        return cmnd;
    }

    public BigDecimal getSoDu() {
        return soDu;
    }

    public String getMaCN() {
        return maCN;
    }

    public Timestamp getNgayMoTK() {
        return ngayMoTK;
    }

    public void setSoTK(String soTK) {
        this.soTK = soTK;
    }

    public void setCMND(String cmnd) {
        this.cmnd = cmnd;
    }

    public void setSoDu(BigDecimal soDu) {
        this.soDu = soDu;
    }

    public void setMaCN(String maCN) {
        this.maCN = maCN;
    }

    public void setNgayMoTK(Timestamp ngayMoTK) {
        this.ngayMoTK = ngayMoTK;
    }
    
}
