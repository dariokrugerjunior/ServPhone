package br.com.servphone.rest;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.jdbc.JDBCEmployeeDAO;
import br.com.servphone.model.Employee;
import com.google.gson.Gson;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.sql.Connection;


@Path("/employe")
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
                return this.buildErrorResponse("CPF já está cadastrado no sistema! ");
            } else if (returnRegister == 1){
                return this.buildErrorResponse("Funcionario cadastrado!");
            } else {
                return this.buildErrorResponse("Erro ao cadastrar no banco de dados, favor informar o administrador.");
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            return this.buildErrorResponse(ex.getMessage());
        }
    }
}
