package br.com.servphone.jdbc;

import br.com.servphone.interfacejdbc.ProductDAO;
import br.com.servphone.model.Product;

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

    private Product addValueProduct(ResultSet rs) {
        Product product = new Product();
        try {
            product.setId(rs.getInt("id"));
            product.setName(rs.getString("name"));
            product.setValueSale(rs.getDouble("value_sale"));
            product.setStatus(rs.getInt("status"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return product;
    }
}
