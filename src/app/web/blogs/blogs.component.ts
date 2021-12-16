import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs : any = [
    {
      id : 1,
      name : 'Which Policy is best for you?',
      date : '22 OCT, 2021',
      description : 'This is a blog description',
      image : 'news-1.jpg'
    },
    {
      id : 2,
      name : 'Which Insurance is good?',
      date : '25 OCT, 2021',
      description : 'This is a blog description',
      image : 'news-2.jpg'
    },
    {
      id : 3,
      name : 'What is Car Insurance?',
      date : '18 OCT, 2021',
      description : 'This is a blog description',
      image : 'news-1.jpg'
    },
    {
      id : 4,
      name : 'How to compare rates?',
      date : '22 OCT, 2021',
      description : 'This is a blog description',
      image : 'news-2.jpg'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
