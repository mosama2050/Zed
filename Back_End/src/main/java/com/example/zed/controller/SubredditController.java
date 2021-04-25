package com.example.zed.controller;

import com.example.zed.dto.SubredditDto;
import com.example.zed.service.SubredditService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.zed.util.ApiPaths.*;


@RestController
@RequestMapping("/api/subreddit")
@AllArgsConstructor
@Slf4j
public class SubredditController {

    private final SubredditService subredditService;

    @PostMapping
    public ResponseEntity<SubredditDto> createSubreddit(@RequestBody SubredditDto subredditDto){
      return ResponseEntity.status(HttpStatus.CREATED).body( subredditService.save(subredditDto));
    }


    @GetMapping
    public ResponseEntity<List<SubredditDto>> getAllSubreddits() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(subredditService.getAll());
    }
//
//    @GetMapping(ID_POSTS_ALL)
//    public List<PostResponse> getAllPostsInSubreddit(@PathVariable Long id) {
//        return subredditService.getAllPosts(id);
//    }
}