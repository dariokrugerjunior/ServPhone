package br.com.servphone.interfacejdbc;

import br.com.servphone.model.Client;

import java.sql.SQLException;
import java.util.List;

public interface ClientDAO {

    List<Client> getAllClients();

    Client getClientById(int id);

    int updateClient(Client client);

    int registerClient(Client client) throws SQLException;
}
