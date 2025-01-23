package com.garret.dreammoa.domain.controller.board;

import com.garret.dreammoa.board.dto.requestdto.BoardRequestDto;
import com.garret.dreammoa.board.dto.responsedto.BoardResponseDto;
import com.garret.dreammoa.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    /**
     * CREATE
     * POST /boards
     */
    @PostMapping
    public ResponseEntity<BoardResponseDto> createBoard(@RequestBody BoardRequestDto requestDto) {
        BoardResponseDto responseDto = boardService.createBoard(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    /**
     * READ 단건
     * GET /api/boards/{postId}
     */
    @GetMapping("/{postId}")
    public ResponseEntity<BoardResponseDto> getBoard(@PathVariable Long postId) {
        BoardResponseDto responseDto = boardService.getBoard(postId);
        return ResponseEntity.ok(responseDto);
    }

    /**
     * READ 전체
     * GET /api/boards
     */
    @GetMapping
    public ResponseEntity<List<BoardResponseDto>> getBoardList() {
        List<BoardResponseDto> list = boardService.getBoardList();
        return ResponseEntity.ok(list);
    }

    /**
     * UPDATE
     * PUT /api/boards/{postId}
     */
    @PutMapping("/{postId}")
    public ResponseEntity<BoardResponseDto> updateBoard(
            @PathVariable Long postId,
            @RequestBody BoardRequestDto requestDto
    ) {
        BoardResponseDto updatedDto = boardService.updateBoard(postId, requestDto);
        return ResponseEntity.ok(updatedDto);
    }

    /**
     * DELETE
     * DELETE /api/boards/{postId}
     */
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long postId) {
        boardService.deleteBoard(postId);
        return ResponseEntity.ok().build();
    }
}
