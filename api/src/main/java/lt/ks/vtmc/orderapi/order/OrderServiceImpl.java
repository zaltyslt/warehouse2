package lt.ks.vtmc.orderapi.order;

import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.orderapi.exception.OrderNotFoundException;
import lt.ks.vtmc.orderapi.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;


    @Override
    public List<Order> getOrders() {
        return orderRepository.findAllByOrderByCreatedAtAsc();
    }

    public Order getOrderByID(String id) {
        return orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found."));
    }

    @Override
    public List<Order> getOrdersContainingText(String text) {
        return orderRepository.findByIdContainingOrDescriptionContainingIgnoreCaseOrderByCreatedAt(text, text);
    }

    @Override
    public Order validateAndGetOrder(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(String.format("Order with id %s not found", id)));
    }

    @Override
    public Order saveOrder(Order order) {
//        if (!order.getPositions().isEmpty()) {
//            List<OrderPosition> positions = order.getPositions().stream().peek(position -> position.setId(null) ).toList();
//            orderPositionRepository.saveAll(positions);
//            order.setPositions(positions);
//        }
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Order order) {
        orderRepository.delete(order);
    }
}
