import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signup } from '../../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SingupService {
  private apiUrl = 'http://localhost:5041/api'; 

  constructor(private http: HttpClient) { }

  
}
