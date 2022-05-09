/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import model.ChiNhanh;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Tuong
 */
public interface IBranchDAO extends GenericDAO<ChiNhanh> {
    List<ChiNhanh> getAll(HttpServletRequest req);

    List<ChiNhanh> findOther(HttpServletRequest req, String currentSub);
}
