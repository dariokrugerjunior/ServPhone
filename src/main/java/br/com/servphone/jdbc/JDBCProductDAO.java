package br.com.servphone.jdbc;

import br.com.servphone.interfacejdbc.ProductDAO;
import br.com.servphone.model.Product;

import javax.ws.rs.core.Response;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JDBCProductDAO implements ProductDAO {

    private Connection connection;

    public JDBCProductDAO (Connection connection) {
        this.connection = connection;
    }
    @Override
    public List<Product> getAllProduct() {
        List<Product> products = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM tb_product");
            while (rs.next()) {
                products.add(addValueProduct(rs));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return products;
    }

    @Override
    public Product getProductById(int id) {
        Product product = new Product();
        try {
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT * FROM tb_product WHERE id=%s", id);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                product = addValueProduct(rs);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return product;
    }

    @Override
    public int updateProduct(Product product) {
        try {
            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE tb_product set " +
                    "value_sale =  ?, " +
                    "status = ? where id = ?");
            preparedStatement.setDouble(1, product.getValueSale());
            preparedStatement.setInt(2, product.getStatus());
            preparedStatement.setInt(3, product.getId());
            return preparedStatement.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @Override
    public int registerProduct(Product product) {
        try {
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM tb_product WHERE name= ?");
            preparedStatement.setString(1, product.getName());
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                return 2;
            }
            preparedStatement = connection.prepareStatement("INSERT tb_product (name, value_sale, status) " +
                    "VAlUES (?, ?, ?)");
            preparedStatement.setString(1, product.getName());
            preparedStatement.setDouble(2, product.getValueSale());
            preparedStatement.setInt(3, product.getStatus());
            return preparedStatement.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Product> getProductActive() {
        List<Product> products = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM tb_product WHERE status= 1");
            while (rs.next()) {
                products.add(addValueProduct(rs));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return products;
    }

    @Override
    public List<Product> getProductByBudgetId(int id) {
        List<Product> products = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT tp.id, tp.name, tbhtp.price_value, tbhtp.amount FROM tb_product tp, tb_budget_has_tb_product tbhtp WHERE tbhtp.tb_budget_id = %s AND tp.id = tbhtp.tb_product_id", id);
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                products.add(addValueProductBudget(rs));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return products;
    }

    private Product addValueProduct(ResultSet rs) {
        Product product = new Product();
        try {
            product.setId(rs.getInt("id"));
            product.setName(rs.getString("name"));
            product.setValueSale(rs.getDouble("value_sale"));
            product.setStatus(rs.getInt("status"));
            product.setAmount(rs.getInt("amount"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return product;
    }

    private Product addValueProductBudget(ResultSet rs) {
        Product product = new Product();
        try {
            product.setId(rs.getInt("id"));
            product.setName(rs.getString("name"));
            product.setValueSale(rs.getDouble("price_value"));
            product.setAmount(rs.getInt("amount"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return product;
    }
}
