package lt.ks.vtmc.orderapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data //Lombok Generates getters for all fields, a useful toString method, and hashCode and equals implementations
      // that check all non-transient fields. Will also generate setters for all non-final fields,
     // as well as a constructor.
public class SignUpRequest {

    @Schema(example = "user3") //swagger
    @NotBlank
    private String username;

    @Schema(example = "user3")
    @NotBlank
    private String password;

    @Schema(example = "User3")
    @NotBlank
    private String name;

    @Schema(example = "user3@mycompany.com")
    @Email
    private String email;
}
