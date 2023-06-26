package lt.ks.vtmc.warehouseapi.user;

import java.time.ZonedDateTime;

public record UserDto(Long id, String username, String name, String email, String role
//,                      List<OrderDto> orders
) {

    public record OrderDto(String id, String description, ZonedDateTime createdAt) {
    }
}