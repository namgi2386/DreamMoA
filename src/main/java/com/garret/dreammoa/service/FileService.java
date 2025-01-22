package com.garret.dreammoa.service;

import com.garret.dreammoa.model.FileEntity;
import com.garret.dreammoa.model.FileEntity.RelatedType;
import com.garret.dreammoa.repository.FileRepository;
import com.garret.dreammoa.util.FileUtils;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository){
        this.fileRepository = fileRepository;
    }

    
    //파일 저장
    public FileEntity saveFile(MultipartFile multipartFile, Long relatedId, FileEntity.RelatedType relatedType) throws Exception {

        // 파일 저장 경로 설정
        String filePath = uploadDir + "/" + multipartFile.getOriginalFilename();
        String fileUrl = "http://yourdomain.com/files/" + multipartFile.getOriginalFilename();

        // 디렉토리 존재 여부 확인 및 생성
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs(); // 디렉토리가 없으면 생성
        }

        // 파일 저장
        File file = new File(filePath);
        multipartFile.transferTo(file);

        // 파일 엔티티 생성
        FileEntity fileEntity = FileEntity.builder()
                .relatedId(relatedId)
                .relatedType(relatedType)
                .fileName(multipartFile.getOriginalFilename())
                .filePath(filePath)
                .fileUrl(fileUrl)
                .fileType(multipartFile.getContentType())
                .build();

        return fileRepository.save(fileEntity);
    }
    public List<FileEntity> getFiles(Long relatedId, RelatedType relatedType) {
        return fileRepository.findByRelatedIdAndRelatedType(relatedId, relatedType);
    }

    
    // 파일 삭제
    public void deleteFile(Long fileId) {
        FileEntity fileEntity = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        // 파일 시스템에서 파일 삭제
        File file = new File(fileEntity.getFilePath());
        if (file.exists()) {
            file.delete();
        }

        // 데이터베이스에서 파일 삭제
        fileRepository.delete(fileEntity);
    }

    //프로필 사진 조회
    public Optional<FileEntity> getProfilePicture(Long userId) {
        return fileRepository.findByRelatedIdAndRelatedType(userId, RelatedType.PROFILE)
                .stream().findFirst();
    }
}
