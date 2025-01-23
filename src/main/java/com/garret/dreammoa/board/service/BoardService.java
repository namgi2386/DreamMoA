package com.garret.dreammoa.board.service;

import com.garret.dreammoa.board.dto.requestdto.BoardRequestDto;
import com.garret.dreammoa.board.dto.responsedto.BoardResponseDto;

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
