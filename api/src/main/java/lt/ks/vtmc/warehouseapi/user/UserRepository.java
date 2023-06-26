package lt.ks.vtmc.warehouseapi.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameAndRole(String username, String role);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
