package br.com.servphone.security;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class FilterServlet implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        try {
            HttpSession session = ((HttpServletRequest) servletRequest).getSession();
            String user = null;
            int role = 0;
            if (session != null){
                user = (String) session.getAttribute("email");
                role = (int) session.getAttribute("role");
            }

            if (user == null) {
                session.setAttribute("msg", "Você não está logado no sistema!");
                session.invalidate();
                ((HttpServletResponse) servletResponse).sendRedirect("/servphone_war_exploded/error.html");
            } else if (role == 1 && ((HttpServletRequest)servletRequest).getRequestURL().toString().contains("admin")) {
                session.setAttribute("msg", "Você não tem acesso a essa pagina!");
                ((HttpServletResponse) servletResponse).sendRedirect("/servphone_war_exploded/pages/index.html");
            } else {
                filterChain.doFilter(servletRequest, servletResponse);
            }
        } catch (Exception ex) {
            ((HttpServletResponse) servletResponse).sendRedirect("/servphone_war_exploded/error.html");
            ex.printStackTrace();
        }
    }
}
