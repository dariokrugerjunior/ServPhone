package br.com.servphone.model;

import java.sql.Timestamp;

public class CashRegister {

    private int id;
    private Timestamp create_time;
    private String form_payment;
    private int budget_id;
    private double discount;
    private double value_total;

    public Timestamp getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Timestamp create_time) {
        this.create_time = create_time;
    }

    public String getForm_payment() {
        return form_payment;
    }

    public void setForm_payment(String form_payment) {
        this.form_payment = form_payment;
    }

    public double getValue_total() {
        return value_total;
    }

    public void setValue_total(double value_total) {
        this.value_total = value_total;
    }

    public int getBudget_id() {
        return budget_id;
    }

    public void setBudget_id(int budget_id) {
        this.budget_id = budget_id;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
