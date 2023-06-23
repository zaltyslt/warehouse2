package lt.ks.vtmc.orderapi.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Value("${spring.application.name}")
    private String applicationName;
    public static final String BEARER_KEY_SECURITY_SCHEME = "bearer-key";

    @Bean
    public OpenAPI customOpenAPI() {

        OpenAPI openAPIInstance = new OpenAPI();
        SecurityScheme securityScheme = new SecurityScheme();
        securityScheme.type(SecurityScheme.Type.HTTP);
        securityScheme.scheme("bearer");
        securityScheme.bearerFormat("JWT");

        Components components = new Components();
        components.addSecuritySchemes(BEARER_KEY_SECURITY_SCHEME, securityScheme);
        return openAPIInstance.components(components);

    }

}
