package backend.duan.banao.mapper;


import backend.duan.banao.dto.response.PromotionResponse;
import backend.duan.banao.entities.Promotion;

public class PromotionMapper {
    public static PromotionResponse toPromotionResponse(Promotion promotion) {
        return PromotionResponse.builder()
                .id(promotion.getId())
                .promotionName(promotion.getPromotionName())
                .promotionPercent(promotion.getPromotionPercent())
                .startDate(promotion.getStartDate())
                .endDate(promotion.getEndDate())
                .description(promotion.getDescription())
                .status(promotion.getStatus())
                .build();
    }
}
