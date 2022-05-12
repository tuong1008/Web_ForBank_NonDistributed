/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao.impl;

import dao.GenericDAO;
import mapper.RowMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

/**
 * @author Tuong
 */
public class AbstractDAO<T> implements GenericDAO<T> {
    public static ResourceBundle resourceBundle = ResourceBundle.getBundle("db");

    public static Connection getConnection(String user, String password) {
        try {
            Class.forName(resourceBundle.getString("driverName"));
            String url = resourceBundle.getString("url");
            String serverName = resourceBundle.getString("serverName");
            String databaseName = resourceBundle.getString("databaseName");
            return DriverManager.getConnection(url + serverName + databaseName, user, password);
        } catch (ClassNotFoundException | SQLException e) {
            return null;
        }
    }
    public static Connection getConnection() {
        try {
            Class.forName(resourceBundle.getString("driverName"));
            String url = resourceBundle.getString("url");
            String serverName = resourceBundle.getString("serverName");
            String databaseName = resourceBundle.getString("databaseName");
            return DriverManager.getConnection(url + serverName + databaseName,"minhto", "minhto123");
        } catch (ClassNotFoundException | SQLException e) {
            return null;
        }
    }

    public static void setParameter(PreparedStatement statement, Object... parameters) {
        try {
            for (int i = 0; i < parameters.length; i++) {
                Object parameter = parameters[i];
                int index = i + 1;
                if (parameter instanceof Long) {
                    statement.setLong(index, (Long) parameter);
                } else if (parameter instanceof String) {
                    statement.setString(index, (String) parameter);
                } else if (parameter instanceof Integer) {
                    statement.setInt(index, (Integer) parameter);
                } else if (parameter instanceof Timestamp) {
                    statement.setTimestamp(index, (Timestamp) parameter);
                } else if (parameter instanceof BigDecimal) {
                    statement.setBigDecimal(index, (BigDecimal) parameter);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public <T> List<T> query(HttpServletRequest req, String sql, RowMapper<T> rowMapper, Object... parameters) {
        List<T> results = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            HttpSession session = req.getSession();
            connection = getConnection();
            statement = connection.prepareStatement(sql);
            setParameter(statement, parameters);
            resultSet = statement.executeQuery();
            while (resultSet.next()) {
                results.add(rowMapper.mapRow(resultSet));
            }
             return results;
        } catch (SQLException e) {
            return null;
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e) {
                return null;
            }
        }
//=======
//        Connection connection = null;
//        PreparedStatement statement = null;
//        ResultSet resultSet = null;
//        try {
//            HttpSession session = req.getSession();
//            connection = getConnection(
//                    session.getAttribute("serverName").toString(),
//                    session.getAttribute("user").toString(),
//                    session.getAttribute("password").toString());
//            statement = connection.prepareStatement(sql);
//            setParameter(statement, parameters);
//            resultSet = statement.executeQuery();
//            while (resultSet.next()) {
//                results.add(rowMapper.mapRow(resultSet));
//            }
//            return results;
//        } catch (SQLException e) {
//            return null;
//        } finally {
//            try {
//                if (connection != null) {
//                    connection.close();
//                }
//                if (statement != null) {
//                    statement.close();
//                }
//                if (resultSet != null) {
//                    resultSet.close();
//                }
//            } catch (SQLException e) {
//                return null;
//            }
//        }
//>>>>>>> 8340cb25ff7beb0f52e3761254155a14dee18ed5
    }
    @Override
	public Long insert(HttpServletRequest req, boolean isStoredProcedured, boolean withTransaction, String sql, Object... parameters) {
    	   
    	Connection connection = null;
		PreparedStatement statement = null;
		ResultSet resultSet = null;
		try {
			Long id = null;
			connection = getConnection();
			connection.setAutoCommit(false);
			statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			setParameter(statement, parameters);
			statement.executeUpdate();
			resultSet = statement.getGeneratedKeys();
			if (resultSet.next()) {
				id = resultSet.getLong(1);
			}
			connection.commit();
			return id;
		} catch (SQLException e) {
			if (connection != null) {
				try {
					connection.rollback();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		} finally {
			try {
				if (connection != null) {
					connection.close();
				}
				if (statement != null) {
					statement.close();
				}
				if (resultSet != null) {
					resultSet.close();
				}
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		}
		return null;
	}

    @Override
    public String crudAction(HttpServletRequest req, boolean isStoredProcedured, boolean withTransaction, String sql, Object... parameters) {
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            HttpSession session = req.getSession();
            connection = getConnection();
            if (withTransaction) connection.setAutoCommit(false);
            statement = connection.prepareStatement(sql);
            setParameter(statement, parameters);
            if (isStoredProcedured) {
                statement.executeQuery();
            } else {
                statement.executeUpdate();
            }
            if (withTransaction) connection.commit();
        } catch (SQLException e) {
            if (connection != null) {
                try {
                    if (withTransaction) connection.rollback();
                } catch (SQLException e1) {
                    e1.printStackTrace();
                }
            }
            return e.getMessage();
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException e2) {
                e2.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public int count(String sql, Object... parameters) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ResultSet query(HttpServletRequest req, String sql, Object... parameters) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            HttpSession session = req.getSession();
            connection = getConnection(session.getAttribute("user").toString(),
                    session.getAttribute("password").toString());
            statement = connection.prepareStatement(sql);
            setParameter(statement, parameters);
            resultSet = statement.executeQuery();
            return resultSet;
        } catch (SQLException e) {
            return null;
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e) {
                return null;
            }
        }
    }
	@Override
	public String crud(HttpServletRequest req, boolean isStoredProcedured, boolean withTransaction, String sql,
			Object... parameters) {
	return null;
	}
}
