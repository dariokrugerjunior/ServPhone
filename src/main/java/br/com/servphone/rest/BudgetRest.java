package br.com.servphone.rest;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.jdbc.JDBCBudgetDAO;
import br.com.servphone.model.Budget;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

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

    @GET
    @Path("/get-by-view")
    @Consumes("application/*")
    public List<Budget> getByView(@QueryParam("view") int view) {
        List<Budget> budgets = new ArrayList<>();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCBudgetDAO jdbcBudgetDAO = new JDBCBudgetDAO(connection);
            budgets = jdbcBudgetDAO.getByView(view);
            connectionDB.closeConnection();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return budgets;
    }

    @POST
    @Path("/update-status")
    @Consumes("application/*")
    public int updateStatus(String idAndStatusParam){
        try {
            Budget budget = new Gson().fromJson(idAndStatusParam, Budget.class);
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCBudgetDAO jdbcBudgetDAO = new JDBCBudgetDAO(connection);
            return jdbcBudgetDAO.updateStatus(budget.getId(), budget.getStatus(), budget.getView());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
            return 0;
    }

    @GET
    @Path("/get-by-status")
    @Consumes("application/*")
    public List<Budget> getByStatus(@QueryParam("status") int status){
        List<Budget> budgets = new ArrayList<>();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCBudgetDAO jdbcBudgetDAO = new JDBCBudgetDAO(connection);
            budgets = jdbcBudgetDAO.getByStatus(status);
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return budgets;
    }
}
