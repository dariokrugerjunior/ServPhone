package br.com.servphone.jdbc;

import br.com.servphone.encrypted.EncryptedMD5;
import br.com.servphone.interfacejdbc.EmployeeDAO;
import br.com.servphone.model.Employee;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class JDBCEmployeeDAO implements EmployeeDAO {

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

    public List<Employee> getAllEmployee() {
        List<Employee> employeeList = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT em.id, em.name, em.phone, em.status, em.email, em.role, em.salary FROM tb_employee em");
            while (rs.next()) {
                employeeList.add(addValueEmployee(rs));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return employeeList;
    }

    @Override
    public Employee getEmployeeById(int id) {
        Employee employee = new Employee();
        try{
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT em.id, em.name, em.phone, em.status, em.email, em.role, em.salary FROM tb_employee em WHERE em.id = %s", id);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                employee = addValueEmployee(rs);
            }
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return employee;
    }

    @Override
    public int updateEmployee(Employee employee) {
        try {
            PreparedStatement stmt = connection.prepareStatement("UPDATE tb_employee SET " +
                    "name = ?, phone = ?, status = ?, role = ?, salary = ?, email = ? WHERE id = ?");
            stmt.setString(1, employee.getName());
            stmt.setString(2, employee.getPhone());
            stmt.setInt(3, employee.getStatus());
            stmt.setInt(4, employee.getRole());
            stmt.setDouble(5, employee.getSalary());
            stmt.setString(6, employee.getEmail());
            stmt.setInt(7, employee.getId());

            stmt.executeUpdate();
            return 1;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    private Employee addValueEmployee(ResultSet rs) throws SQLException {
        Employee employee = new Employee();
        try{
            employee.setId(rs.getInt("id"));
            employee.setName(rs.getString("name"));
            employee.setPhone(rs.getString("phone"));
            employee.setEmail(rs.getString("email"));
            employee.setSalary(rs.getDouble("salary"));
            employee.setStatus(rs.getInt("status"));
            employee.setRole(rs.getInt("role"));
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return employee;
    }
}
