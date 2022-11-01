package br.com.servphone.rest;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.jdbc.JDBCProductDAO;
import br.com.servphone.model.Product;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

@Path("/product")
public class ProductRest extends UtilRest {

    @GET
    @Path("/get")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> getAllProduct() {
        List<Product> products = new ArrayList<>();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCProductDAO jdbcProductDAO = new JDBCProductDAO(connection);
            products = jdbcProductDAO.getAllProduct();
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return products;
    }

    @GET
    @Path("/get-by-id")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public Product getProductById(@QueryParam("id") int id){
        Product product = new Product();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCProductDAO jdbcProductDAO = new JDBCProductDAO(connection);
            product = jdbcProductDAO.getProductById(id);
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return product;
    }

    @PUT
    @Path("/update")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public int updateProduct(String productParam) {
        try {
            Product product = new Gson().fromJson(productParam, Product.class);
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCProductDAO jdbcProductDAO = new JDBCProductDAO(connection);
            int result = jdbcProductDAO.updateProduct(product);
            connectionDB.closeConnection();
            return result;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

}
