/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import mapper.RowMapper;

import javax.servlet.http.HttpServletRequest;
import java.sql.ResultSet;
import java.util.List;

public interface GenericDAO<T> {
    <T> List<T> query(HttpServletRequest req, String sql, RowMapper<T> rowMapper, Object... parameters);
    public Long insert(HttpServletRequest req, boolean isStoredProcedured, boolean withTransaction, String sql, Object... parameters);
    String crudAction(HttpServletRequest req, boolean isStoredProcedured, boolean withTransaction, String sql, Object... parameters);
    String crud(HttpServletRequest req, boolean isStoredProcedured, boolean withTransaction, String sql, Object... parameters);
    int count(String sql, Object... parameters);

    ResultSet query(HttpServletRequest req, String sql, Object... parameters);
}
