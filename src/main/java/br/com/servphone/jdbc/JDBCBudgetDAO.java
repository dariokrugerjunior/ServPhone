package br.com.servphone.jdbc;

import br.com.servphone.interfacejdbc.BudgetDAO;
import br.com.servphone.model.Budget;
import br.com.servphone.model.BudgetEdit;
import br.com.servphone.model.Product;
import br.com.servphone.model.Service;
import org.apache.cxf.Bus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    @Override
    public int update(BudgetEdit budgetEdit) {
        try {
            if (updateBudget(budgetEdit) > 0) {
                for(Product products : budgetEdit.getProducts()){
                    addProductBudget(products, budgetEdit.getId());
                }
                for(Service service : budgetEdit.getServices()){
                    addServiceBudget(service, budgetEdit.getId());
                }
                    return 1;
            }
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @Override
    public int countStatus(int status, String time) {
        try {
            PreparedStatement stmt = connection.prepareStatement("SELECT COUNT(*) FROM tb_budget tb  WHERE status = ? AND DATE(update_time) = ?");
            stmt.setInt(1, status);
            stmt.setString(2, dateFormat(time));
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                int count = rs.getInt(1);
                return count;
            } else {
                return 0;
            }
        }catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    private int updateBudget(BudgetEdit budgetEdit){
        try{
            PreparedStatement stmt = connection.prepareStatement("UPDATE tb_budget set status =  ?, defect = ?, description = ? where id = ?");
            stmt.setInt(1, budgetEdit.getStatus());
            stmt.setString(2, budgetEdit.getDefect());
            stmt.setString(3, budgetEdit.getDescription());
            stmt.setInt(4, budgetEdit.getId());
            return stmt.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    private int addServiceBudget(Service service, int id) {
        try {
            PreparedStatement stmt = connection.prepareStatement("INSERT INTO tb_budget_has_tb_service (tb_budget_id, tb_service_id, name, price_hours, amount_hours) VALUES (?, ?, ?, ?, ?)");
            stmt.setInt(1, id);
            stmt.setInt(2, service.getId());
            stmt.setString(3, service.getName());
            stmt.setDouble(4, service.getPriceHours());
            stmt.setDouble(5, service.getAmountHours());
            return stmt.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    private int addProductBudget(Product product, int id) {
        try {
            PreparedStatement stmt = connection.prepareStatement("INSERT INTO tb_budget_has_tb_product (tb_budget_id, tb_product_id, name, price_value, amount) VALUES (?, ?, ?, ?, ?)");
            stmt.setInt(1, id);
            stmt.setInt(2, product.getId());
            stmt.setString(3, product.getName());
            stmt.setDouble(4, product.getValueSale());
            stmt.setInt(5, product.getAmount());
            return stmt.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
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
            budget.setUpdate_time(rs.getTimestamp("update_time"));
            budget.setCreate_time(rs.getTimestamp("create_time"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return budget;
    }

    private String dateFormat(String time) {
        Date date = new Date();
        date.setTime(Long.parseLong(time));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = sdf.format(date);
        return formattedDate;
    }


}
