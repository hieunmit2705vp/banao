package backend.duan.banao.mapper;

import backend.duan.banao.dto.response.SizeResponse;
import backend.duan.banao.entities.Size;

public class SizeMapper {

    public static SizeResponse toSizeResponse(Size size) {
        return SizeResponse.builder()
                .id(size.getId())
                .name(size.getSizeName())
                .status(size.getStatus())
                .build();
    }
}
