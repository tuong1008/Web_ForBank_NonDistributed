/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao.impl;

import dao.IBranchDAO;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import mapper.BranchMapper;
import model.ChiNhanh;

/**
 *
 * @author Tuong
 */
public class BranchDAO extends AbstractDAO<ChiNhanh> implements IBranchDAO{

    @Override
    public List<ChiNhanh> getAll(HttpServletRequest req) {
        return query(req, "select * from ChiNhanh", new BranchMapper());
    }
    
    @Override
    public List<ChiNhanh> findOther(HttpServletRequest req, String currentSub){
        return query(req, "select * from ChiNhanh where maCN<>?", new BranchMapper(), currentSub);
    }
    
}
