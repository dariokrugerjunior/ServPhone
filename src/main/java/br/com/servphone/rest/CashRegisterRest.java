package br.com.servphone.rest;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.jdbc.JDBCCashRegisterDAO;
import br.com.servphone.model.CashRegister;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

@Path("/cash-register")
public class CashRegisterRest extends UtilRest {

    @POST
    @Path("/register-payment")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public int registerPayment(String paymentParam) {
        CashRegister cashRegister = new Gson().fromJson(paymentParam, CashRegister.class);
        int result = 0;
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCCashRegisterDAO jdbcCashRegisterDAO = new JDBCCashRegisterDAO(connection);
            result = jdbcCashRegisterDAO.registerPayment(cashRegister);
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
    }

    @GET
    @Path("/get-by-id-budget")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public CashRegister getByBudgetId(@QueryParam("id") int id) {
        CashRegister cashRegister = null;
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCCashRegisterDAO jdbcCashRegisterDAO = new JDBCCashRegisterDAO(connection);
            cashRegister = jdbcCashRegisterDAO.getByBudgetId(id);
            connectionDB.closeConnection();
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return cashRegister;
    }

    @GET
    @Path("/get")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public List<CashRegister> getAll() {
        List<CashRegister> cashRegisterList = new ArrayList<CashRegister>();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCCashRegisterDAO jdbcCashRegisterDAO = new JDBCCashRegisterDAO(connection);
            cashRegisterList = jdbcCashRegisterDAO.getAll();
            connectionDB.closeConnection();
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return cashRegisterList;
    }

    @GET
    @Path("/get-by-id")
    @Consumes("application/*")
    @Produces({MediaType.APPLICATION_JSON})
    public CashRegister getCashById(@QueryParam("id") int id) {
        CashRegister cashRegister = new CashRegister();
        try{
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCCashRegisterDAO jdbcCashRegisterDAO = new JDBCCashRegisterDAO(connection);
            cashRegister = jdbcCashRegisterDAO.getById(id);
            connectionDB.closeConnection();
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return cashRegister;
    }

}
