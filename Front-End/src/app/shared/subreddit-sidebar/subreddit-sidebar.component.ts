import { Component, OnInit } from '@angular/core';
import {SubredditModel} from '../../subreddit/subreddit-model';
import {SubredditService} from '../../subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-sidebar',
  templateUrl: './subreddit-sidebar.component.html',
  styleUrls: ['./subreddit-sidebar.component.css']
})
export class SubredditSidebarComponent implements OnInit {

  displayViewAll: any;
  subreddits: Array<SubredditModel> = [];

  constructor(private subredditService: SubredditService) { }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
      console.log(this.subreddits);
    });
  }


}
