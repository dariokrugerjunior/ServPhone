package br.com.servphone.jdbc;

import br.com.servphone.interfacejdbc.ServiceDAO;
import br.com.servphone.model.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JDBCServiceDAO implements ServiceDAO {

    private Connection connection;

    public JDBCServiceDAO (Connection connection) { this.connection = connection; }


    @Override
    public List<Service> getAllServices() {
        List<Service> services = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM tb_service");
            while (rs.next()) {
                services.add(addValueService(rs));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return services;
    }

    @Override
    public Service getServiceById(int id) {
        Service service = new Service();
        try {
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT * FROM tb_service WHERE id=%s", id);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                service = addValueService(rs);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return service;
    }

    @Override
    public int updateService(Service service) {
        try {
            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE tb_service set " +
                    "price_hours =  ?, " +
                    "status = ? where id = ?");
            preparedStatement.setDouble(1, service.getPriceHours());
            preparedStatement.setInt(2, service.getStatus());
            preparedStatement.setInt(3, service.getId());
            return preparedStatement.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @Override
    public int registerService(Service service) {
        try {
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM tb_service WHERE name= ?");
            preparedStatement.setString(1, service.getName());
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                return 2;
            }
            preparedStatement = connection.prepareStatement("INSERT tb_service (name, price_hours, status) " +
                    "VAlUES (?, ?, ?)");
            preparedStatement.setString(1, service.getName());
            preparedStatement.setDouble(2, service.getPriceHours());
            preparedStatement.setInt(3, service.getStatus());
            return preparedStatement.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Service> getServicesActive() {
        List<Service> services = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM tb_service WHERE status= 1");
            while (rs.next()) {
                services.add(addValueService(rs));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return services;
    }

    @Override
    public List<Service> getServiceByBudgetId(int id) {
        List<Service> services = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT ts.id, ts.name, tbhts.price_hours, tbhts.amount_hours FROM tb_service ts, tb_budget_has_tb_service tbhts WHERE tbhts.tb_budget_id = %s AND ts.id = tbhts.tb_service_id", id);
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                services.add(addValueBudgetService(rs));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return services;
    }

    private Service addValueService(ResultSet rs) {
        Service service = new Service();
        try {
            service.setId(rs.getInt("id"));
            service.setName(rs.getString("name"));
            service.setStatus(rs.getInt("status"));
            service.setPriceHours(rs.getDouble("price_hours"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return service;
    }

    private Service addValueBudgetService(ResultSet rs) {
        Service service = new Service();
        try {
            service.setId(rs.getInt("id"));
            service.setName(rs.getString("name"));
            service.setPriceHours(rs.getDouble("price_hours"));
            service.setAmountHours(rs.getInt("amount_hours"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return service;
    }
}
