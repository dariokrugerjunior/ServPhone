package br.com.servphone.interfacejdbc;

import br.com.servphone.model.Budget;
import br.com.servphone.model.Client;

import java.util.List;

public interface BudgetDAO {
    int registerBudget(Budget budget);
    List<Budget> getByView(int view);
    int updateStatus(int id, int status, int view);
    Budget getById(int id);
    List<Budget> getByStatus(int status);
}
