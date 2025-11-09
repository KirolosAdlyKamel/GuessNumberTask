import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common';

@Injectable({ providedIn: 'root' })
export class GameService {
  private commonService = inject(CommonService);
  private baseUrl = this.commonService.baseUrl; // backend URL

  constructor(private http: HttpClient) {}

  // 🔹 Get lowest score
  getBestScore(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/game/bestscore`);
  }

  // 🔹 Save lowest score
  saveBestScore(score: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/game/bestscore`, { score });
  }

}
