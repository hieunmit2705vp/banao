package backend.duan.banao.mapper;

import backend.duan.banao.dto.response.CategoryResponse;
import backend.duan.banao.entities.Category;

public class CategoryMapper {
    public static CategoryResponse toCategoryResponse(Category category) {
        if (category == null)
            return null;
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getCategoryName())
                .status(category.getStatus())
                .build();
    }
}
