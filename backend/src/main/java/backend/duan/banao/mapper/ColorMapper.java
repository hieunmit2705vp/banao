package backend.duan.banao.mapper;


import backend.duan.banao.dto.response.ColorResponse;
import backend.duan.banao.entities.Color;


public class ColorMapper {
    public static ColorResponse toColorResponse(Color color){
        return ColorResponse.builder()
                .id(color.getId())
                .name(color.getColorName())
                .status(color.getStatus())
                .build();
    }
}
