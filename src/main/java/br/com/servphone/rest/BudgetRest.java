package br.com.servphone.rest;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.jdbc.JDBCBudgetDAO;
import br.com.servphone.model.Budget;
import br.com.servphone.model.BudgetEdit;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
    @Path("/get-all-by-role")
    @Consumes("application/*")
    public List<Budget> getAllByRole(@QueryParam("role") int role) {
        List<Budget> budgets = new ArrayList<>();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCBudgetDAO jdbcBudgetDAO = new JDBCBudgetDAO(connection);
            budgets = jdbcBudgetDAO.getAllByRole(role);
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
            return jdbcBudgetDAO.updateStatus(budget.getId(), budget.getStatus());
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

    @GET
    @Path("/get-by-id")
    @Consumes("application/*")
    public Budget getById(@QueryParam("id") int id) {
        Budget budget = new Budget();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCBudgetDAO jdbcBudgetDAO = new JDBCBudgetDAO(connection);
            budget = jdbcBudgetDAO.getById(id);
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return budget;
    }

    @PUT
    @Path("/update")
    @Consumes("application/*")
    public int update(String budgetEditParam) {
        try {
            BudgetEdit budgetEdit = new Gson().fromJson(budgetEditParam, BudgetEdit.class);
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCBudgetDAO jdbcBudgetDAO = new JDBCBudgetDAO(connection);
            return jdbcBudgetDAO.update(budgetEdit);
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @GET
    @Path("/count")
    @Consumes("application/*")
    public int countStatus(@QueryParam("status") int status, @QueryParam("time") String time) {
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCBudgetDAO jdbcBudgetDAO = new JDBCBudgetDAO(connection);
            return jdbcBudgetDAO.countStatus(status, time);
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }
}
