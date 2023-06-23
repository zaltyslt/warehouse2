package lt.ks.vtmc.orderapi.rest.dto;

import java.time.ZonedDateTime;

public record OrderDto(String id,
                       String description,
                       String clientName,
                       OrderDto.UserDto user,
                       ZonedDateTime createdAt
) {

    public record UserDto(String username) {
    }
}