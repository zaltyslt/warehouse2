package lt.ks.vtmc.warehouseapi.runner;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lt.ks.vtmc.warehouseapi.client.Client;
import lt.ks.vtmc.warehouseapi.client.ClientRepository;
import lt.ks.vtmc.warehouseapi.item.Item;
import lt.ks.vtmc.warehouseapi.item.ItemRepository;
import lt.ks.vtmc.warehouseapi.order.OrderRepository;
import lt.ks.vtmc.warehouseapi.security.WebSecurityConfig;
import lt.ks.vtmc.warehouseapi.user.User;
import lt.ks.vtmc.warehouseapi.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;
    private final ItemRepository itemRepository;
    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "Admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
            new User("user", "user", "User", "user@mycompany.com", WebSecurityConfig.USER)
    );

    private static final List<Client> CLIENTS = Arrays.asList(
            new Client(null, "NameA", "SurnameA", LocalDate.of(2023, 6, 23), "223322", false, new ArrayList<>()),
            new Client(null, "NameB", "SurnameB", LocalDate.of(2022, 5, 15), "223322", false, new ArrayList<>())

    );

    private void gen1() {
        Random random = new Random();
        List<Client> clients = new ArrayList<>();
        int client = random.nextInt(30) + 1;
        for (int c = 0; c < client; c++) {
            Client newClient = new Client(
                    null,
                    "Name" + Integer.toString(c),
                    "Surname" + Integer.toString(c),
                    LocalDate.now().minusDays(c),
                    "phone" + c,
                    c % 2 == 0,
                    null
            );
            newClient = clientRepository.save(newClient);
            clients.add(newClient);

            for (Client tempClient : clients) {
                int items = random.nextInt(30) + 1;
                for (int i = 0; i < items; i++) {

                    itemRepository.save(new Item(
                            (Long) null,
                            "Item" + i,
                            (double) random.nextInt(30) + 1,
                            (byte) (random.nextInt(40) + 1),
                            LocalDate.now(),
                            tempClient

                    ));

                }
            }
        }
    }

    @Override
    public void run(String... args) {
        if (userService.getUsers().isEmpty()) {

            USERS.forEach(user -> {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userService.saveUser(user);
            });
        }
        if (clientRepository.findAll().isEmpty()) {
            clientRepository.saveAll(CLIENTS);
        }
        gen1();
        log.info("Database initialized");
    }

}
