package br.com.servphone.jdbc;

import br.com.servphone.interfacejdbc.CashRegisterDAO;
import br.com.servphone.model.CashRegister;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class JDBCCashRegisterDAO implements CashRegisterDAO {

    private final Connection connection;

    public JDBCCashRegisterDAO(Connection connection) {
        this.connection = connection;
    }
    @Override
    public int registerPayment(CashRegister cashRegister) {
        try {
            if (getByBudgetId(cashRegister.getBudget_id()) == null) {
                PreparedStatement stmt = connection.prepareStatement("INSERT INTO tb_cash_register " +
                        "(form_payment, budget_id, discount, value_total) " +
                        "VALUES (?, ?, ?, ?)");
                stmt.setString(1, cashRegister.getForm_payment());
                stmt.setInt(2, cashRegister.getBudget_id());
                stmt.setDouble(3, cashRegister.getDiscount());
                stmt.setDouble(4, cashRegister.getValue_total());
                int result = stmt.executeUpdate();
                if (result > 0 ){
                    new JDBCBudgetDAO(connection).updateStatus(cashRegister.getBudget_id(), 11);
                }
                return result;
            } else {
                return 20;
            }
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @Override
    public CashRegister getByBudgetId(int id) {
        CashRegister cashRegister = null;
        try {
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT * FROM tb_cash_register tcr where tcr.budget_id = %s", id);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                cashRegister = addValueCashRegister(rs);
            }
        } catch (Exception ex){
            ex.printStackTrace();
        }
        return cashRegister;
    }

    @Override
    public List<CashRegister> getAll() {
        List<CashRegister> cashRegisterList = new ArrayList<CashRegister>();
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM tb_cash_register");
            while (rs.next()) {
                cashRegisterList.add(addValueCashRegister(rs));
            }

        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return cashRegisterList;
    }

    @Override
    public CashRegister getById(int id) {
        CashRegister cashRegister = new CashRegister();
        try {
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT * FROM tb_cash_register WHERE id=%s", id);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                cashRegister = addValueCashRegister(rs);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return cashRegister;
    }

    private CashRegister addValueCashRegister(ResultSet rs){
        CashRegister cashRegister = new CashRegister();
        try {
            cashRegister.setId(rs.getInt("id"));
            cashRegister.setCreate_time(rs.getTimestamp(("create_time")));
            cashRegister.setDiscount(rs.getDouble("discount"));
            cashRegister.setBudget_id(rs.getInt("budget_id"));
            cashRegister.setForm_payment(rs.getString("form_payment"));
            cashRegister.setValue_total(rs.getDouble("value_total"));
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return cashRegister;
    }

}
