package lt.ks.vtmc.warehouseapi.item;

import lt.ks.vtmc.warehouseapi.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {



//    List<Order> findByIdContainingOrDescriptionContainingIgnoreCaseOrderByCreatedAt(String id, String description);
    List<Item> findAllByClient(Client client);
}
