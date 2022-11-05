package br.com.servphone.model;

public class Service {

    private int id;
    private String name;
    private Double priceHours;
    private int status;

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

    public Double getPriceHours() { return priceHours; }

    public void setPriceHours(Double priceHours) { this.priceHours = priceHours; }



}
