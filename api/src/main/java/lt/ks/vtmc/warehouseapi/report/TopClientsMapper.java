package lt.ks.vtmc.warehouseapi.report;

import lt.ks.vtmc.warehouseapi.client.Client;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TopClientsMapper {
    List<ClientTopDto> topClients(List<Client> clients) {
        return clients.stream()
                .map(client -> new ClientTopDto(
                        client.getId(),
                        client.getName() + ' ' + client.getSurname(),
                        client.getItems().size(),
                        client.getItems().stream()
                                .mapToDouble(item -> item.getWeight())
                                .sum()

                ))

                .toList();

    }
}
