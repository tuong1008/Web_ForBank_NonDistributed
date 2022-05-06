/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.BufferedReader;
import java.io.IOException;

/**
 *
 * @author Tuong
 */
public class HttpUtil {
    String value;
    
    public HttpUtil (String value){
        this.value = value;
    }
    
    public <T> T toModel(Class<T> tClass){
        try {
            return new ObjectMapper().readValue(value, tClass);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
   
    public static HttpUtil of(BufferedReader reader) {
        StringBuilder sb = new StringBuilder();
        try {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException e) {
            System.out.print(e.getMessage());
        }
        return new HttpUtil(sb.toString());
    }
}
