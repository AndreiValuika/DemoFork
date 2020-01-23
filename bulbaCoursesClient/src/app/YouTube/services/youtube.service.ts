import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchRequest } from '../components/search-request/search-request.component';
import { Subject } from 'rxjs';
import { SearchStory } from '../models/searchstory';
import { CustomUser } from 'src/app/auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  resultSubject = new Subject<ResultVideo[]>();
  result$ = this.resultSubject.asObservable();

  constructor(private client: HttpClient) { }

  searchVideo(searchRequest: SearchRequest, user: CustomUser) {

      return this.client.post<ResultVideo[]>('http://localhost:60601/api/SearchRequest', searchRequest, { headers: {
      UserSub: `${user.sub}`
    }});
  }

//   getStory(user: CustomUser) {
//     return this.client.get<SearchStory[]>('http://localhost:60601/api/story/guest', {
//      params: new HttpParams().set('userId', user.sub)
//    });
//  }
getStory(user: CustomUser) {
  console.log('Get stories on service, item = ', user.sub);
  return this.client.get<SearchStory[]>(`http://localhost:60601/api/story/${user.sub}`);
}

//  delStoryById(item: number) {
//     console.log('Del story on service, item = ', item);
//     return this.client.put('http://localhost:60601/api/story/hide', {
//       params: new HttpParams().set('storyid', item.toString())
//     });
//  }

  delStoryById(story: SearchStory) {
    console.log('Del story on service, item = ', story.Id);
    return this.client.put(`http://localhost:60601/api/story/hide`, story.Id);
  }
}

export interface ResultVideo {
  Id: string;
  Title: string;
  Description: string;
  PublishedAt: Date;
  Definition: string;
  Dimension: string;
  Duration: string;
  VideoCaption: string;
  Thumbnail: string;
  Channel: {
    Id: string;
    Name: string;
  };
  Channel_Id: string;
}
