package backend.duan.banao.mapper;

import backend.duan.banao.dto.response.ProductResponse;
import backend.duan.banao.entities.Product;

public class ProductMapper {
    public static ProductResponse toProductResponse(Product product) {
        if (product == null)
            return null;
        return ProductResponse.builder()
                .id(product.getId())
                .brand(BrandMapper.toBrandResponse(product.getBrand()))
                .category(CategoryMapper.toCategoryResponse(product.getCategory()))
                .material(MaterialMapper.toMaterialResponse(product.getMaterial()))
                .productName(product.getProductName())
                .productCode(product.getProductCode())
                .status(product.getStatus())
                .build();
    }
}
