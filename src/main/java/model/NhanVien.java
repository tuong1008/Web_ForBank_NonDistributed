/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

public class NhanVien{
    private String maNV;
    private String ho;
    private String ten;
    private String diaChi;
    private String phai;
    private String soDT;
    private String maCN;
    private int trangThaiXoa;

    public String getMaNV() {
        return maNV;
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

    public String getSoDT() {
        return soDT;
    }

    public String getMaCN() {
        return maCN;
    }

    public int getTrangThaiXoa() {
        return trangThaiXoa;
    }

    public void setMaNV(String maNV) {
        this.maNV = maNV;
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

    public void setSoDT(String soDT) {
        this.soDT = soDT;
    }

    public void setMaCN(String maCN) {
        this.maCN = maCN;
    }

    public void setTrangThaiXoa(int trangThaiXoa) {
        this.trangThaiXoa = trangThaiXoa;
    }
     
}
