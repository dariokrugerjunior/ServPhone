package br.com.servphone.interfacejdbc;

import br.com.servphone.model.CashRegister;

import java.util.List;

public interface CashRegisterDAO {
    int registerPayment(CashRegister cashRegister);
    CashRegister getByBudgetId(int id);

    List<CashRegister> getAll();

    CashRegister getById(int id);
}
