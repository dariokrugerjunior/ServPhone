package br.com.servphone.jdbc;

import br.com.servphone.interfacejdbc.BudgetDAO;
import br.com.servphone.model.Budget;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCBudgetDAO implements BudgetDAO {

    private final Connection connection;

    public JDBCBudgetDAO(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int registerBudget(Budget budget) {
        try {
            PreparedStatement stmt = connection.prepareStatement("INSERT INTO tb_budget " +
                    "(status, defect, brand, model, description, password_product, client_id) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)");
            stmt.setInt(1, budget.getStatus());
            stmt.setString(2, budget.getDefect());
            stmt.setString(3, budget.getBrand());
            stmt.setString(4, budget.getModel());
            stmt.setString(5, budget.getDescription());
            stmt.setString(6, budget.getPassword_product());
            stmt.setInt(7, budget.getClient_id());
            return stmt.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }
}
