package br.com.servphone.rest;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.jdbc.JDBCEmployeeDAO;
import br.com.servphone.model.Employee;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Connection;
import java.util.List;


@Path("/employee")
public class EmployeeRest extends UtilRest {
    @POST
    @Path("/register")
    @Consumes("application/*")
    public Response register (String employeeParam) {
        try {

            Employee employee = new Gson().fromJson(employeeParam, Employee.class);

            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCEmployeeDAO jdbcEmployeeDAO = new JDBCEmployeeDAO(connection);
            int returnRegister = jdbcEmployeeDAO.registerEmployee(employee);
            connectionDB.closeConnection();

            if (returnRegister == 0) {
                return this.buildErrorResponse("Email já está cadastrado no sistema! ");
            } else if (returnRegister == 1){
                return this.buildResponseMsg("Funcionario cadastrado!");
            } else {
                return this.buildErrorResponse("Erro ao cadastrar no banco de dados, favor informar o administrador.");
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            return this.buildErrorResponse(ex.getMessage());
        }
    }

    @GET
    @Path("/get")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Employee> getAll() {
        List<Employee> employees = null;
        try {

            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCEmployeeDAO jdbcEmployeeDAO = new JDBCEmployeeDAO(connection);
            employees = jdbcEmployeeDAO.getAllEmployee();
            connectionDB.closeConnection();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return employees;
    }

    @GET
    @Path("/get-by-id")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public Employee getByIdEmployee(@QueryParam("id") int id) {
        Employee employee = new Employee();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCEmployeeDAO jdbcEmployeeDAO = new JDBCEmployeeDAO(connection);
            employee = jdbcEmployeeDAO.getEmployeeById(id);
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return employee;
    }

    @PUT
    @Path("/update")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public int updateEmployee(String employeeParam) {
        try {
            Employee employee = new Gson().fromJson(employeeParam, Employee.class);
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCEmployeeDAO jdbcEmployeeDAO = new JDBCEmployeeDAO(connection);
            int result = jdbcEmployeeDAO.updateEmployee(employee);
            connectionDB.closeConnection();
            return result;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }


}
