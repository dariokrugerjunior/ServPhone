package br.com.servphone.rest;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.jdbc.JDBCBudgetDAO;
import br.com.servphone.model.Budget;
import com.google.gson.Gson;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.sql.Connection;

@Path("/budget")
public class BudgetRest extends UtilRest{

    @POST
    @Path("/register")
    @Consumes("application/*")
    public Response register (String budgetParam) {
        try {
            Budget budget = new Gson().fromJson(budgetParam, Budget.class);

            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCBudgetDAO jdbcBudgetDAO = new JDBCBudgetDAO(connection);
            int returnRegister = jdbcBudgetDAO.registerBudget(budget);
            if (returnRegister == 1) {
                return this.buildResponseMsg("Orçamento cadastrado com sucesso!");
            } else {
                return this.buildErrorResponse("Erro ao cadastrar orçamento no banco de dados, favor informar o administrador.");
            }
        } catch (Exception ex) {
            return this.buildErrorResponse(ex.getMessage());
        }
    }
}
