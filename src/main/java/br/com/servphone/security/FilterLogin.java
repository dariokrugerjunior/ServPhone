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
                user = (String) session.getAttribute("email");
            }

            if (user == null) {
                session.setAttribute("msg", "Você não está logado no sistema!");
                session.invalidate();
                ((HttpServletResponse) servletResponse).sendRedirect("/servphone_war_exploded/error.html");
            } else {
                filterChain.doFilter(servletRequest, servletResponse);
                ((HttpServletResponse) servletResponse).sendRedirect("/servphone_war_exploded/pages/index.html");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
