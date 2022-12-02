package br.com.servphone.jdbc;

import br.com.servphone.interfacejdbc.BudgetDAO;
import br.com.servphone.model.Budget;
import org.apache.cxf.Bus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<Budget> getAllByRole(int role) {
        List<Budget> budgets = new ArrayList<>();
        try {
            String query = "SELECT B.*, C.name, C.phone FROM tb_budget B LEFT JOIN tb_client C on B.client_id = C.id";
            if (role == 1) {
                query += " WHERE B.status in (1, 4, 5, 8)";
            }
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                budgets.add(addValueBudgetAndClient(rs));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return budgets;
    }

    @Override
    public int updateStatus(int id, int status) {
        try {
            PreparedStatement stmt = connection.prepareStatement("UPDATE tb_budget set status =  ? where id = ?");
            stmt.setInt(1, status);
            stmt.setInt(2, id);
            return stmt.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @Override
    public Budget getById(int id) {
        try {
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT B.*, C.name, C.phone FROM tb_budget B LEFT JOIN tb_client C on B.client_id = C.id where B.id = %s", id);
            ResultSet rs = stmt.executeQuery(query);
            if(rs.next()){
                return addValueBudgetAndClient(rs);
            }
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Budget> getByStatus(int status) {
        List<Budget> budgets = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT B.*, C.name, C.phone FROM tb_budget B LEFT JOIN tb_client C on B.client_id = C.id where B.status = %s", status);
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                budgets.add(addValueBudgetAndClient(rs));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return budgets;
    }


    private Budget addValueBudgetAndClient(ResultSet rs) {
        Budget budget = new Budget();
        try{
            budget.setId(rs.getInt("id"))   ;
            budget.setStatus(rs.getInt("status"));
            budget.setDefect(rs.getString("defect"));
            budget.setBrand(rs.getString("brand"));
            budget.setModel(rs.getString("model"));
            budget.setDescription(rs.getString("description"));
            budget.setPassword_product(rs.getString("password_product"));
            budget.setClient_id(rs.getInt("client_id"));
            budget.setEmployee_id(rs.getInt("employee_id"));
            budget.setName(rs.getString("name"));
            budget.setPhone(rs.getString("phone"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return budget;
    }


}
