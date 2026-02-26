package backend.duan.banao.mapper;

import backend.duan.banao.dto.response.BrandResponse;
import backend.duan.banao.entities.Brand;

public class BrandMapper {

    public static BrandResponse toBrandResponse(Brand brand) {
        return BrandResponse.builder()
                .id(brand.getId())
                .brandName(brand.getBrandName())
                .status(brand.getStatus())
                .build();
    }
}
