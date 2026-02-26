package backend.duan.banao.repositories;

import backend.duan.banao.entities.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeRepository extends JpaRepository<Size, Integer> {

    @Query("""
                SELECT s FROM Size s
                WHERE (:search IS NULL OR :search = '' OR LOWER(s.sizeName) LIKE LOWER('%' || :search || '%'))
            """)
    Page<Size> searchSizes(@Param("search") String search, Pageable pageable);

    boolean existsBySizeName(String name);
}
