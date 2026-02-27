package backend.duan.banao.services;

import backend.duan.banao.dto.request.ColorCreateRequest;
import backend.duan.banao.dto.request.ColorUpdateRequest;
import backend.duan.banao.dto.response.ColorResponse;
import backend.duan.banao.entities.Color;
import backend.duan.banao.exceptions.EntityAlreadyExistsException;
import backend.duan.banao.exceptions.EntityNotFoundException;
import backend.duan.banao.exceptions.ResourceNotFoundException;
import backend.duan.banao.mapper.ColorMapper;
import backend.duan.banao.repositories.ColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ColorService {
    @Autowired
    ColorRepository colorRepository;

    public Page<ColorResponse> getAllColors(String search, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Color> colors = colorRepository.searchColors(search, pageable);

        return colors.map(ColorMapper::toColorResponse);
    }

    public ColorResponse getColorById(Integer id) {
        Color color = colorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy màu sắc có id: " + id));
        return ColorMapper.toColorResponse(color);
    }

    @Transactional
    public ColorResponse createColor(ColorCreateRequest colorCreateRequest) {
        if (colorRepository.existsByColorName(colorCreateRequest.getName())) {
            throw new ResourceNotFoundException("Màu sắc có tên: " + colorCreateRequest.getName() + " đã tồn tại");
        }
        Color color = new Color();
        color.setColorName(colorCreateRequest.getName());
        color = colorRepository.save(color);
        return ColorMapper.toColorResponse(color);
    }

    @Transactional
    public ColorResponse updateColor(Integer id, ColorUpdateRequest colorUpdateRequest) {
        Color color = colorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy màu sắc có id: " + id));

        if(color.getColorName().equalsIgnoreCase(colorUpdateRequest.getName()) && colorRepository.existsByColorName(colorUpdateRequest.getName())) {
            throw new EntityAlreadyExistsException("Màu sắc có tên: " + colorUpdateRequest.getName() + " đã tồn tại");
        }
        color.setColorName(colorUpdateRequest.getName());
        color = colorRepository.save(color);
        return ColorMapper.toColorResponse(color);
    }

    @Transactional
    public ColorResponse toggleColorStatus(Integer id) {
        Color color = colorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy màu sắc có id: " + id));
        color.setStatus(!color.getStatus());
        color = colorRepository.save(color);
        return ColorMapper.toColorResponse(color);
    }

    @Transactional
    public void deleteColor(Integer id) {
        Color color = colorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy màu sắc có id: " + id));
        colorRepository.delete(color);
    }
}
