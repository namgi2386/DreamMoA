package com.garret.dreammoa.domain.service.board;

import com.garret.dreammoa.domain.dto.board.requestdto.BoardRequestDto;
import com.garret.dreammoa.domain.dto.board.responsedto.BoardResponseDto;

import java.util.List;

public interface BoardService {

    // CREATE
    BoardResponseDto createBoard(BoardRequestDto dto);

    // READ
    BoardResponseDto getBoard(Long postId);
    List<BoardResponseDto> getBoardList();

    // UPDATE
    BoardResponseDto updateBoard(Long postId, BoardRequestDto dto);

    // DELETE
    void deleteBoard(Long postId);

}
