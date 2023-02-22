package br.com.servphone.model;

public class Product {
    private int id;
    private String name;
    private Double value_sale;
    private int status;
    private int amount;

    public Product() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public Double getValueSale() {
        return value_sale;
    }

    public void setValueSale(Double value_sale) {
        this.value_sale = value_sale;
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getAmount() {
        return this.amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

}
