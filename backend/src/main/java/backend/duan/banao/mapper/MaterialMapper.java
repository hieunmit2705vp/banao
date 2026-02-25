package backend.duan.banao.mapper;

import backend.duan.banao.dto.response.MaterialResponse;
import backend.duan.banao.entities.Material;

public class MaterialMapper {
    public static MaterialResponse toMaterialResponse(Material material) {
        if (material == null)
            return null;
        return MaterialResponse.builder()
                .id(material.getId())
                .materialName(material.getMaterialName())
                .status(material.getStatus())
                .build();
    }
}
