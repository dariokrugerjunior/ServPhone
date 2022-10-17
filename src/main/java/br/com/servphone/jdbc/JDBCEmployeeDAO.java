package br.com.servphone.jdbc;

import br.com.servphone.encrypted.EncryptedMD5;
import br.com.servphone.model.Employee;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCEmployeeDAO {

    private Connection connection;
    public JDBCEmployeeDAO(Connection connection) {
        this.connection = connection;
    }

    public int registerEmployee(Employee employee) {
        String queryValidate = String.format("SELECT email FROM tb_employee WHERE email= '%s'", employee.getEmail());
        String passwordMd5 = EncryptedMD5.hashMd5(employee.getPassword());

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(queryValidate);
            if (rs.next()) {
                return 0; // ERRO, EMAIL DUPLICADO
            } else {
                String query = String.format("INSERT INTO tb_employee (name, phone, status, email, password, role, salary) VALUES (%s, %s, %d, %s, %s, %d, %f)",
                        employee.getName(),
                        employee.getPhone(),
                        employee.getStatus(),
                        employee.getEmail().toLowerCase(),
                        passwordMd5,
                        employee.getRole(),
                        employee.getSalary());
                stmt = connection.createStatement();
                stmt.executeQuery(query);
                return 1;
            }
        } catch (Exception ex) {
            return 2;
        }
    }
}
