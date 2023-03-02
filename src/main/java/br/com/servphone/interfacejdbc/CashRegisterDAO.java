package br.com.servphone.interfacejdbc;

import br.com.servphone.model.CashRegister;

public interface CashRegisterDAO {
    int registerPayment(CashRegister cashRegister);
    CashRegister getByBudgetId(int id);
}
