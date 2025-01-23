package com.garret.dreammoa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {

    List<FileEntity> findByRelatedIdAndRelatedType(Long relatedId, RelatedType relatedType);

    void deleteByFileId(Long fileId);
}
