package lt.ks.vtmc.warehouseapi.order;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateOrderRequest {

    @Schema(example = "Buy two iPhones")
    private Long id;
    @NotBlank
    private String description;
    private String clientName;



}
