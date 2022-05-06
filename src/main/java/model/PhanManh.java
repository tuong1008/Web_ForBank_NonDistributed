/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author Tuong
 */
public class PhanManh {
    String maCN;
    String tenCN;
    String tenServer;

    public String getTenCN() {
        return tenCN;
    }

    public String getTenServer() {
        return tenServer;
    }

    public void setTenCN(String tenCN) {
        this.tenCN = tenCN;
    }

    public void setTenServer(String tenServer) {
        this.tenServer = tenServer;
    }

    public String getMaCN() {
        return maCN;
    }

    public void setMaCN(String maCN) {
        this.maCN = maCN;
    }
    
}
