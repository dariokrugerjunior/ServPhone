package br.com.servphone.rest;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.jdbc.JDBCClientDAO;
import br.com.servphone.model.Client;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

@Path("/client")
public class ClientRest extends UtilRest{

    @GET
    @Path("/get")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Client> getAll() {
        List<Client> clients = null;
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCClientDAO jdbcEmployeeDAO = new JDBCClientDAO(connection);
            clients = jdbcEmployeeDAO.getAllClients();
            connectionDB.closeConnection();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return clients;
    }

    @GET
    @Path("/get-by-id")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public Client getByIdClient(@QueryParam("id") int id) {
        Client client = new Client();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCClientDAO jdbcEmployeeDAO = new JDBCClientDAO(connection);
            client = jdbcEmployeeDAO.getClientById(id);
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return client;
}

    @PUT
    @Path("/update")
    @Consumes("application/*")
    @Produces(MediaType.APPLICATION_JSON)
    public int updateClient(String employeeParam) {
        try {
            Client client = new Gson().fromJson(employeeParam, Client.class);
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCClientDAO jdbcEmployeeDAO = new JDBCClientDAO(connection);
            int result = jdbcEmployeeDAO.updateClient(client);
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
    public Response register (String clientParam) {
        try {
            Client client = new Gson().fromJson(clientParam, Client.class);

            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCClientDAO jdbcClientDAO = new JDBCClientDAO(connection);
            int returnRegister = jdbcClientDAO.registerClient(client);

            if (returnRegister == 0) {
                return this.buildErrorResponse("CPF já está cadastrado no sistema! ");
            } else if (returnRegister == 1){
                return this.buildResponseMsg("Cliente cadastrado com sucesso!");
            } else {
                return this.buildErrorResponse("Erro ao cadastrar no banco de dados, favor informar o administrador.");
            }


        } catch (Exception ex) {
            return this.buildErrorResponse(ex.getMessage());
        }
    }

    @GET
    @Path("/client-active")
    @Consumes("application/*")
    public List<Client> getClientActive() {
        List<Client> clients = new ArrayList<Client>();
        try {
            ConnectionDB connectionDB = new ConnectionDB();
            Connection connection = connectionDB.openConnection();
            JDBCClientDAO jdbcClientDAO = new JDBCClientDAO(connection);
            clients = jdbcClientDAO.getClientActive();
            connectionDB.closeConnection();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return clients;
    }

}
