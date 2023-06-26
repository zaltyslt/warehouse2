package lt.ks.vtmc.warehouseapi.report;

public record ClientTopDto(
        Long id,
        String name,
        Integer itemsCount,
        Double itemsWeight
        ) {
}
