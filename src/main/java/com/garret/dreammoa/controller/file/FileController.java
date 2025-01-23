package com.garret.dreammoa.controller.file;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    public FileController (FileService fileService) {
        this.fileService = fileService;
    }


    // 파일 업로드
    @PostMapping("/upload")
    public ResponseEntity<FileEntity> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("relatedId") Long relatedId,
            @RequestParam("relatedType") RelatedType relatedType
    ) {
        try {
            FileEntity savedFile = fileService.saveFile(file, relatedId, relatedType);
            return ResponseEntity.ok(savedFile);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).build();
        }
    }

    // 특정 관련 ID 및 타입에 해당하는 파일 목록 조회
    @GetMapping("/related")
    public ResponseEntity<List<FileEntity>> getFiles(
            @RequestParam("relatedId") Long relatedId,
            @RequestParam("relatedType") RelatedType relatedType
    ) {
        List<FileEntity> files = fileService.getFiles(relatedId, relatedType);
        return ResponseEntity.ok(files);
    }

    // 파일 삭제
    @DeleteMapping("/{fileId}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long fileId) {
        fileService.deleteFile(fileId);
        return ResponseEntity.ok().build();
    }
}