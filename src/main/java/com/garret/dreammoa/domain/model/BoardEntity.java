package com.garret.dreammoa.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_board")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardEntity {

    /**
     * 게시글 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", columnDefinition = "INT UNSIGNED")
    private Long postId;

    /**
     * 작성자 (회원) : ManyToOne 관계
     * UserEntity의 PK(id)를 참조 (user_id)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")  // 외래키 이름
    private UserEntity user;

    /**
     * 게시글 카테고리 : '질문','자유'
     * DB의 ENUM('질문','자유') 와 매핑
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private Category category;

    /**
     * 제목/내용
     */
    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    /**
     * 작성일 / 수정일
     */
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = (this.createdAt == null) ? LocalDateTime.now() : this.createdAt;
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 카테고리를 위한 enum
     * DB의 ENUM('질문','자유') 와 동일한 이름으로 매핑
     */
    public enum Category {
        질문, 자유
    }
}
