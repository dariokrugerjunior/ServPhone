package br.com.servphone.interfacejdbc;

import br.com.servphone.model.Budget;
import br.com.servphone.model.Client;

import java.util.List;

public interface BudgetDAO {
    int registerBudget(Budget budget);
    List<Budget> getAllByRole(int role);
    int updateStatus(int id, int status);
    Budget getById(int id);
    List<Budget> getByStatus(int status);
}
