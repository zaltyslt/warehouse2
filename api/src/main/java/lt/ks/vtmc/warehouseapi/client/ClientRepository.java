package lt.ks.vtmc.warehouseapi.client;

import lt.ks.vtmc.warehouseapi.order.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {



//    List<Order> findByIdContainingOrDescriptionContainingIgnoreCaseOrderByCreatedAt(String id, String description);
    Client findByNameIgnoreCaseAndSurnameIgnoreCaseAndAndBirthDay(String name, String surname, LocalDate birthday);
    Boolean existsByNameAndSurnameAndBirthDay(String name, String surname, LocalDate birthday);

    @Query("SELECT c, COUNT(i) AS item_count FROM Client c LEFT JOIN c.items i GROUP BY c.id ORDER BY item_count DESC")
    List<Client> findTopClientsWithItemCount(Pageable pageable);

    @Query("SELECT c, SUM(i.weight) AS total_weight FROM Client c JOIN c.items i GROUP BY c.id ORDER BY total_weight DESC")
    List<Client> findTopClientsWithBiggestWeightSum(Pageable pageable);
}
