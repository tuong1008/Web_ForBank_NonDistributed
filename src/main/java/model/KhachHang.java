/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.sql.Timestamp;

public class KhachHang{
    private String cmnd;
    private String ho;
    private String ten;
    private String diaChi;
    private String phai;
    private Timestamp ngayCap;
    private String soDT;
    private String maCN;

    public String getCMND() {
        return cmnd;
    }

    public String getHo() {
        return ho;
    }

    public String getTen() {
        return ten;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public String getPhai() {
        return phai;
    }

    public Timestamp getNgayCap() {
        return ngayCap;
    }

    public String getSoDT() {
        return soDT;
    }

    public String getMaCN() {
        return maCN;
    }

    public void setCMND(String cmnd) {
        this.cmnd = cmnd;
    }

    public void setHo(String ho) {
        this.ho = ho;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public void setPhai(String phai) {
        this.phai = phai;
    }

    public void setNgayCap(Timestamp ngayCap) {
        this.ngayCap = ngayCap;
    }

    public void setSoDT(String soDT) {
        this.soDT = soDT;
    }

    public void setMaCN(String maCN) {
        this.maCN = maCN;
    }
    
}
