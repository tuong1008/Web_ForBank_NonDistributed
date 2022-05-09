/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import model.ChiNhanh;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Tuong
 */
public interface IBranchService {
    List<ChiNhanh> getAll(HttpServletRequest req);

    List<ChiNhanh> findOther(HttpServletRequest req, String currentSub);
}
