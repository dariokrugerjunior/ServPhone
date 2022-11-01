package br.com.servphone.interfacejdbc;

import br.com.servphone.model.Product;

import java.util.List;

public interface ProductDAO {

    public List<Product> getAllProduct();

    public Product getProductById(int id);

    public int updateProduct(Product product);

}
