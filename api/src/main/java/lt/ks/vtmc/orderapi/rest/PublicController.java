package lt.ks.vtmc.orderapi.rest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.orderapi.order.CreateOrderRequest;
import lt.ks.vtmc.orderapi.order.OrderService;
import lt.ks.vtmc.orderapi.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor

@RestController
@RequestMapping("/public")
public class PublicController {

    private final UserService userService;
    private final OrderService orderService;

    @GetMapping("/numberOfUsers")
    public Integer getNumberOfUsers() throws InterruptedException {
        var users = userService.getUsers().size();
        return users;
    }

    @GetMapping("/numberOfOrders")
    public Integer getNumberOfOrders() {

        return orderService.getOrders().size();
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/order")
    public void createOrder(
//            @AuthenticationPrincipal CustomUserDetails currentUser,
                                @Valid @RequestBody CreateOrderRequest createOrderRequest) {
        var aa = createOrderRequest;
//        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
//        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
//        Order order = orderMapper.toOrder(createOrderRequest);
//        order.setId(UUID.randomUUID().toString());
//        order.setUser(user);
//        return orderMapper.toOrderDto(orderService.saveOrder(order));

    }
}
