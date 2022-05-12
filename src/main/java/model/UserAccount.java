package model;

public class UserAccount {
    private int id;
    private String taiKhoan;
    private String matKhau;
    private String imageUrl;
    private String khachHangID;

    public UserAccount() {
        super();
    }

    public UserAccount(int id, String taiKhoan, String matKhau, String imageUrl, String khachHangID) {
        super();
        this.id = id;
        this.taiKhoan = taiKhoan;
        this.matKhau = matKhau;
        this.imageUrl = imageUrl;
        this.khachHangID = khachHangID;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(String taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getKhachHangID() {
        return khachHangID;
    }

    public void setKhachHangID(String khachHangID) {
        this.khachHangID = khachHangID;
    }


}
