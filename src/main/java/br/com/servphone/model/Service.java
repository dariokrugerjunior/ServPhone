package br.com.servphone.model;

public class Service {

    private int id;
    private String name;
    private Double price_hours;
    private int status;

    private int amount_hours;

    public Service() {
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

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Double getPriceHours() { return price_hours; }

    public void setPriceHours(Double price_hours) { this.price_hours = price_hours; }

    public int getAmountHours() { return amount_hours; }

    public void setAmountHours(int amount_hours) { this.amount_hours = amount_hours; }



}
