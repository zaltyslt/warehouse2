package lt.ks.vtmc.orderapi.order;

import lt.ks.vtmc.orderapi.order.Order;

import java.util.List;

public interface OrderService {

    List<Order> getOrders();

    List<Order> getOrdersContainingText(String text);

    Order validateAndGetOrder(String id);

    Order saveOrder(Order order);
    public Order getOrderByID(String id);

    void deleteOrder(Order order);
}
