package com.garret.dreammoa.board.dto.responsedto;

import com.garret.dreammoa.board.model.BoardEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class BoardResponseDto {

    private Long postId;
    private Long userId;
    private String userNickname; // 작성자 닉네임 보여주거나...
    private BoardEntity.Category category; // enum
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
