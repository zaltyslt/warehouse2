package lt.ks.vtmc.warehouseapi.client;

import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.warehouseapi.exception.DuplicatedClientExeption;
import lt.ks.vtmc.warehouseapi.exception.OrderNotFoundException;
import lt.ks.vtmc.warehouseapi.exception.ResourceNotFoundException;
import lt.ks.vtmc.warehouseapi.order.Order;
import lt.ks.vtmc.warehouseapi.order.OrderRepository;
import lt.ks.vtmc.warehouseapi.order.OrderService;
import org.hibernate.exception.DataException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public List<Client> getClients() {
        return clientRepository.findAll(Sort.by("surname"));
    }

    public Client getClient(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException(String.format("Client id: %s not found!",id)));

        return client;
    }


    public boolean clientExists(Client client) {
        return clientRepository.existsByNameAndSurnameAndBirthDay(
                client.getName(), client.getSurname(), client.getBirthDay());
    }

    public boolean clientExists(Long id) {
        return clientRepository.existsById(id);
    }

    public Client createClient(Client client) {
        var aa = clientRepository.findByNameIgnoreCaseAndSurnameIgnoreCaseAndAndBirthDay(client.getName(), client.getSurname(), client.getBirthDay());


        if (!clientExists(client)){
        return  clientRepository.save(client);
        }
           throw new DuplicatedClientExeption(String.format("Client with name %s surname %s and birthdate %s allready exists",
                   client.getName(), client.getSurname(), client.getBirthDay()));
    }
}
