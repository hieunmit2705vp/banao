package backend.duan.banao.mapper;

import backend.duan.banao.dto.response.CollarResponse;
import backend.duan.banao.entities.Collar;

public class CollarMapper {
    public static CollarResponse toCollarResponse(Collar collar) {
        return CollarResponse.builder()
                .id(collar.getId())
                .name(collar.getCollarName())
                .status(collar.getStatus())
                .build();
    }
}
