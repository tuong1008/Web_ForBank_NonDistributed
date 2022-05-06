/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import model.GD_GoiRut;

/**
 *
 * @author Tuong
 */
public interface IDepositWithdrawService {
    List<GD_GoiRut> getAll(HttpServletRequest req);
    String insertDepositWithdraw(HttpServletRequest req, GD_GoiRut trans);
}
