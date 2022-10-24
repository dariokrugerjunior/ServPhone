package br.com.servphone.interfacejdbc;

import br.com.servphone.model.Employee;

import java.util.List;

public interface EmployeeDAO {

    public int registerEmployee(Employee employee);

    public List<Employee> getAllEmployee();

    public Employee getEmployeeById(int id);

    public int updateEmployee(Employee employee);
}
