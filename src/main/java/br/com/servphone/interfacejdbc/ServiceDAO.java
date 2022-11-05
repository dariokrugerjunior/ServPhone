package br.com.servphone.interfacejdbc;
import br.com.servphone.model.Service;

import java.util.List;

public interface ServiceDAO {

    public List<Service> getAllServices();
    public Service getServiceById(int id);
    public int updateService(Service service);
    public int registerService(Service service);



}
