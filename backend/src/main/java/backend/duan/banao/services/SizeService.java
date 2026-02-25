package backend.duan.banao.services;

import backend.duan.banao.dto.request.SizeCreateRequest;
import backend.duan.banao.dto.request.SizeUpdateRequest;
import backend.duan.banao.dto.response.SizeResponse;
import backend.duan.banao.entities.Size;
import backend.duan.banao.mapper.SizeMapper;
import backend.duan.banao.repositories.SizeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SizeService {

    private static final Logger logger = LoggerFactory.getLogger(SizeService.class);

    @Autowired
    private SizeRepository sizeRepository;

    @Transactional(readOnly = true)
    public Page<SizeResponse> getAllSizes(String search, int page, int size, String sortBy, String sortDir) {
        logger.info("Fetching sizes with search: {}, page: {}, size: {}, sortBy: {}, sortDir: {}",
                search, page, size, sortBy, sortDir);
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Size> sizePage = sizeRepository.searchSizes(search, pageable);

        return sizePage.map(SizeMapper::toSizeResponse);

    }

    @Transactional(readOnly = true)
    public SizeResponse getSizeById(int id) {
        logger.info("Fetching size with id: {}", id);
        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kích cỡ có id: " + id));
        return SizeMapper.toSizeResponse(size);
    }

    @Transactional
    public SizeResponse createSize(SizeCreateRequest sizeCreateRequest) {
        logger.info("Creating size with name: {}", sizeCreateRequest.getName());
        if (sizeRepository.existsBySizeName(sizeCreateRequest.getName())) {
            logger.warn("Size with name {} already exists", sizeCreateRequest.getName());
            throw new RuntimeException("Kích cỡ có tên: " + sizeCreateRequest.getName() + " đã tồn tại");
        }

        Size size = new Size();
        size.setSizeName(sizeCreateRequest.getName());
        size.setStatus(true);

        size = sizeRepository.save(size);
        logger.info("Size created successfully with id: {}", size.getId());
        return SizeMapper.toSizeResponse(size);
    }

    @Transactional
    public SizeResponse updateSize(Integer id, SizeUpdateRequest sizeUpdateRequest) {
        logger.info("Updating size with id: {}", id);
        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kích cỡ có id: " + id));

        if (!size.getSizeName().equalsIgnoreCase(sizeUpdateRequest.getName())
                && sizeRepository.existsBySizeName(sizeUpdateRequest.getName())) {
            logger.warn("Size with name {} already exists", sizeUpdateRequest.getName());
            throw new RuntimeException("Kích cỡ có tên: " + sizeUpdateRequest.getName() + " đã tồn tại");
        }

        size.setSizeName(sizeUpdateRequest.getName());
        size = sizeRepository.save(size);
        logger.info("Size updated successfully with id: {}", size.getId());
        return SizeMapper.toSizeResponse(size);
    }

    @Transactional
    public SizeResponse toggleStatusSize(Integer id) {
        logger.info("Toggling status for size with id: {}", id);
        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kích cỡ có id: " + id));

        size.setStatus(!size.getStatus());
        size = sizeRepository.save(size);
        logger.info("Size status toggled successfully for id: {}", id);
        return SizeMapper.toSizeResponse(size);
    }

    @Transactional
    public void deleteSize(Integer id) {
        logger.info("Deleting size with id: {}", id);
        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kích cỡ có id: " + id));

        sizeRepository.delete(size);
        logger.info("Size deleted successfully with id: {}", id);
    }
}
