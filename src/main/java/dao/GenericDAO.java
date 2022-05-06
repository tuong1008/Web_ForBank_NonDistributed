/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.sql.ResultSet;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import mapper.RowMapper;

public interface GenericDAO<T>  {
    <T> List<T> query(HttpServletRequest req, String sql, RowMapper<T> rowMapper, Object... parameters);
    String crudAction (HttpServletRequest req, boolean isStoredProcedured, boolean withTransaction, String sql, Object... parameters);
    int count (String sql, Object... parameters);
    ResultSet query(HttpServletRequest req, String sql, Object... parameters);
}
