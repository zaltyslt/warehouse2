package lt.ks.vtmc.warehouseapi.client;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateClientRequest {

    @Schema(example = "Create client with parameters ...")

    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String surname;
    @NotBlank
    private LocalDate birthDay;
    @NotBlank
    private String phone;
    @NotBlank
    private Boolean loyalty;



}
