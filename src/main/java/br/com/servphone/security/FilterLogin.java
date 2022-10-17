package br.com.servphone.security;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class FilterLogin implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        try {
            HttpSession session = ((HttpServletRequest) servletRequest).getSession();
            String user = null;
            if (session != null){
                user = (String) session.getAttribute("login");
            }

            if (user == null) {
                session.setAttribute("msg", "Você não está logado no sistema!");
                session.invalidate();
                ((HttpServletResponse) servletResponse).sendRedirect("/");
            } else {
                filterChain.doFilter(servletRequest, servletResponse);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
