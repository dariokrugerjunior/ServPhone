package br.com.servphone.jdbc;

import br.com.servphone.encrypted.EncryptedMD5;
import br.com.servphone.model.Employee;
import br.com.servphone.model.Login;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCSecurityDAO {
    private Connection connection;


    public JDBCSecurityDAO(Connection connection) {
        this.connection = connection;
    }

    public Employee ValidateUserLoginDB(Login user) {

        String query = String.format("SELECT em.id, em.name, em.phone, em.status, em.email, em.password, em.role, em.salary FROM tb_employee em WHERE email = '%s' AND password = '%s' ",
                user.getLogin().toLowerCase(),
                EncryptedMD5.hashMd5(user.getPassword()));
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);
            Employee employee = new Employee();
            if(resultSet.next()){
                employee.setId(resultSet.getInt("id"));
                employee.setName(resultSet.getString("name"));
                employee.setPhone(resultSet.getString("phone"));
                employee.setStatus(resultSet.getInt("status"));
                employee.setEmail(resultSet.getString("email"));
                employee.setRole(resultSet.getInt("role"));
                employee.setSalary(resultSet.getDouble("salary"));
            }
            return employee;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

}
