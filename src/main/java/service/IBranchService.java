/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import model.ChiNhanh;

/**
 *
 * @author Tuong
 */
public interface IBranchService {
    List<ChiNhanh> getAll(HttpServletRequest req);
    List<ChiNhanh> findOther(HttpServletRequest req, String currentSub);
}
