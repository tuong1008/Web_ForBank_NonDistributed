/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import model.ChiNhanh;

/**
 *
 * @author Tuong
 */
public interface IBranchDAO extends GenericDAO<ChiNhanh>{
    public List<ChiNhanh> getAll(HttpServletRequest req);
    public List<ChiNhanh> findOther(HttpServletRequest req, String currentSub);
}
