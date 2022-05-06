/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package constant;

import java.text.SimpleDateFormat;
import java.util.Map;
import model.PhanManh;

/**
 *
 * @author Tuong
 */
public class SystemConstant {
    public static SimpleDateFormat ddMMyyyy = new SimpleDateFormat("dd-MM-yyyy");
    public static SimpleDateFormat yyyyMMdd = new SimpleDateFormat("yyyy-MM-dd");
    public static String defaultPassword = "Admin1234.";
    public static  Map<String, PhanManh> subscribersMap = null;
}
