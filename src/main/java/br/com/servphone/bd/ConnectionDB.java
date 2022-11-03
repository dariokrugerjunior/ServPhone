package br.com.servphone.bd;
import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectionDB {
    private Connection connection;
    private static final String User = "root";
    private static final String Password = "root";
    private static final String Url = "jdbc:mysql://127.0.0.1:3306/servphone?&userTimezone=true&serverTimezone=UTC";
    private static final String Driver = "com.mysql.cj.jdbc.Driver";

    public Connection openConnection() {
        try{
            Class.forName(Driver);
            connection = DriverManager.getConnection(Url, User, Password);
        } catch (Exception ex){
            ex.printStackTrace();
        }
        return connection;
    }

    public void closeConnection() {
        try{
            connection.close();
        } catch (Exception ex){
            ex.printStackTrace();
        }
    }
}
