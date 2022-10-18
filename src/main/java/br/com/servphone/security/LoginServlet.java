package br.com.servphone.security;

import br.com.servphone.bd.ConnectionDB;
import br.com.servphone.encrypted.EncryptedBase64;
import br.com.servphone.jdbc.JDBCSecurityDAO;
import br.com.servphone.model.Employee;
import br.com.servphone.model.Login;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

public class LoginServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    public LoginServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException {
        process(request, response);
    }

    protected void process (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Login user = new Login();
        EncryptedBase64 encode64 = new EncryptedBase64();

        try {

            user.setLogin(request.getParameter("login"));
            user.setPassword(encode64.encode_base64(request.getParameter("password")));
            ConnectionDB connectionDB = new ConnectionDB();
            Connection conecSQL = connectionDB.openConnection();
            JDBCSecurityDAO jdbcSecurityDAO = new JDBCSecurityDAO(conecSQL);
            Employee employeeUser = jdbcSecurityDAO.ValidateUserLoginDB(user);
            connectionDB.closeConnection();
            PrintWriter out = response.getWriter();

            if (employeeUser.getStatus() == 1) {
                HttpSession session = request.getSession();
                session.setAttribute("id", employeeUser.getId());
                session.setAttribute("name", employeeUser.getName());
                session.setAttribute("email", employeeUser.getEmail());// Vincula um objeto a sessao, no caso o login do usuario está sendo colocado na sessao.
                session.setAttribute("phone", employeeUser.getPhone());
                session.setAttribute("role", employeeUser.getRole());
                out.write("ok " + employeeUser.getRole());
            } else if (employeeUser.getStatus() == 0) {
                response.sendError(500, "Usuario desativado pelo administrador");
            } else {
                response.sendError(500, "Login ou senha incorretos.");
            }

        }catch (NullPointerException ex) {
            ex.getMessage();
            ex.printStackTrace();
        } catch (IOException ex) {
            ex.getMessage();
            ex.printStackTrace();
        }
    }


}
