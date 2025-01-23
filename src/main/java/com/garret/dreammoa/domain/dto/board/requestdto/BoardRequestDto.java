package com.garret.dreammoa.domain.dto.board.requestdto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardRequestDto {

    private Long userId;         // 작성자 user PK
    private String category;     // "질문" or "자유"
    private String title;
    private String content;
}
