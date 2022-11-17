package br.com.servphone.jdbc;

import br.com.servphone.interfacejdbc.ClientDAO;
import br.com.servphone.model.Client;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class JDBCClientDAO implements ClientDAO {

    private final Connection connection;

    public JDBCClientDAO(Connection connection) {
        this.connection = connection;
    }

    public List<Client> getAllClients() {
        List<Client> clients = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM tb_client");
            while (rs.next()) {
                clients.add(addValueClient(rs));
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return clients;
    }

    @Override
    public Client getClientById(int id) {
        Client client = new Client();
        try {
            Statement stmt = connection.createStatement();
            String query = String.format("SELECT * FROM tb_client WHERE id=%s", id);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                client = addValueClient(rs);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return client;
    }

    @Override
    public int updateClient(Client client) {
        try {
            PreparedStatement pstmt = connection.prepareStatement("update tb_client set " +
                    "cpf_cnpj = ?," +
                    " name = ?," +
                    " cep = ?," +
                    " address = ?," +
                    " number = ?," +
                    " district = ?," +
                    " city = ?," +
                    " state = ?," +
                    " complement = ?," +
                    " phone = ?," +
                    " email = ?," +
                    " status = ?" +
                    " where id = ?");
            pstmt.setString(1, client.getCpf_cnpj());
            pstmt.setString(2, client.getName());
            pstmt.setString(3, client.getCep());
            pstmt.setString(4, client.getAddress());
            pstmt.setInt(5, client.getNumber());
            pstmt.setString(6, client.getDistrict());
            pstmt.setString(7, client.getCity());
            pstmt.setString(8, client.getState());
            pstmt.setString(9, client.getComplement());
            pstmt.setString(10, client.getPhone());
            pstmt.setString(11, client.getEmail());
            pstmt.setBoolean(12, client.isStatus());
            pstmt.setInt(13, client.getId());
            pstmt.executeUpdate();
            return 1;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    @Override
    public int registerClient(Client client) {
        try {
            String queryValidate = String.format("SELECT cpf_cnpj FROM tb_client WHERE cpf_cnpj= '%s'", client.getCpf_cnpj());
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(queryValidate);
            if (rs.next()) {
                return 0; // CPF OU CNPJ JÁ CADASTRADO
            }
            PreparedStatement pstmt = connection.prepareStatement("INSERT INTO tb_client " +
                    "(cpf_cnpj, name, cep, address, number, district, city, state, complement, phone, email, status) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            pstmt.setString(1, client.getCpf_cnpj());
            pstmt.setString(2, client.getName());
            pstmt.setString(3, client.getCep());
            pstmt.setString(4, client.getAddress());
            pstmt.setInt(5, client.getNumber());
            pstmt.setString(6, client.getDistrict());
            pstmt.setString(7, client.getCity());
            pstmt.setString(8, client.getState());
            pstmt.setString(9, client.getComplement());
            pstmt.setString(10, client.getPhone());
            pstmt.setString(11, client.getEmail());
            pstmt.setBoolean(12, client.isStatus());
            pstmt.execute();
            return 1;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 2;
    }

    @Override
    public List<Client> getClientActive() {
        List<Client> clients = new ArrayList<>();
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM tb_client WHERE status=1");
            while (rs.next()) {
                clients.add(addValueClient(rs));
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return clients;
    }

    private Client addValueClient(ResultSet rs) {
        Client client = new Client();
        try {
            client.setId(rs.getInt("id"));
            client.setCpf_cnpj(rs.getString("cpf_cnpj"));
            client.setName(rs.getString("name"));
            client.setCep(rs.getString("cep"));
            client.setAddress(rs.getString("address"));
            client.setNumber(rs.getInt("number"));
            client.setDistrict(rs.getString("district"));
            client.setCity(rs.getString("city"));
            client.setState(rs.getString("state"));
            client.setComplement(rs.getString("complement"));
            client.setPhone(rs.getString("phone"));
            client.setEmail(rs.getString("email"));
            client.setStatus(rs.getBoolean("status"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return client;
    }
}
