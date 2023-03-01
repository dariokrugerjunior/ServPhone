package br.com.servphone.rest;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.jdbc.JDBCServiceDAO;
import br.com.servphone.model.Service;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

@Path("/service")
public class ServiceRest extends UtilRest {

    @GET
    @Path("/get")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Service> getAllService() {
        List<Service> services = new ArrayList<>();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCServiceDAO jdbcServiceDAO = new JDBCServiceDAO(connection);
            services = jdbcServiceDAO.getAllServices();
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return services;
    }

    @GET
    @Path("/get-by-id")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public Service getServiceById(@QueryParam("id") int id){
        Service service = new Service();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCServiceDAO jdbcServiceDAO = new JDBCServiceDAO(connection);
            service = jdbcServiceDAO.getServiceById(id);
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return service;
    }

    @PUT
    @Path("/update")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public int updateService(String serviceParam) {
        try {
            Service service = new Gson().fromJson(serviceParam, Service.class);
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection ();
            JDBCServiceDAO jdbcServiceDAO = new JDBCServiceDAO(connection);
            int result = jdbcServiceDAO.updateService(service);
            connectionDB.closeConnection();
            return result;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @POST
    @Path("/register")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public Response registerService(String serviceParam) {
        try {
            Service service = new Gson().fromJson(serviceParam, Service.class);
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCServiceDAO jdbcServiceDAO = new JDBCServiceDAO(connection);
            int returnRegister = jdbcServiceDAO.registerService(service);
            connectionDB.closeConnection();
            if (returnRegister == 0) {
                return this.buildErrorResponse("Erro ao cadastrar serviço!");
            } else if (returnRegister == 2) {
                return this.buildErrorResponse("Serviço já cadastrado");
            } else {
                return this.buildResponseMsg("Serviço cadastrado com sucesso!");
            }
        } catch (Exception ex) {
            return this.buildErrorResponse(ex.getMessage());
        }
    }
    @GET
    @Path("/service-active")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Service> getServiceActive() {
        List<Service> services = new ArrayList<>();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCServiceDAO jdbcServiceDAO = new JDBCServiceDAO(connection);
            services = jdbcServiceDAO.getServicesActive();
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return services;
    }

    @GET
    @Path("/service-budget")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Service> getProductByServiceId(@QueryParam("id") int id) {
        List<Service> services = new ArrayList<>();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCServiceDAO jdbcServiceDAO = new JDBCServiceDAO(connection);
            services = jdbcServiceDAO.getServiceByBudgetId(id);
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return services;
    }




}
