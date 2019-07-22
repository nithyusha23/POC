import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable, throwError, of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { Project } from './project';  

@Injectable({
  providedIn: 'root',
})
export class ProjectService {  
  private projectsUrl = 'http://localhost:7071/api/';  
  
  constructor(private http: HttpClient) { }  
  
  getProjects(): Observable<Project[]> {  
    return this.http.get<Project[]>(this.projectsUrl + 'projects')  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  getProject(sponsor: string, displayName: string): Observable<Project> {  
    if (displayName === '') {  
      return of(this.initializeProject());  
    }  
    const url = `${this.projectsUrl + 'project'}/${sponsor}/${displayName}`;  
    return this.http.get<Project>(url)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  createProject(project: Project): Observable<Project> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    delete project.id;
    console.log(project);
    return this.http.post<Project>(this.projectsUrl + 'project', project, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  deleteProject(id: string, displayName: string): Observable<{}> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${this.projectsUrl + 'project'}/${displayName}/${id}`;  
    return this.http.delete<Project>(url, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  updateProject(project: Project): Observable<Project> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = this.projectsUrl + 'project';  
    return this.http.put<Project>(url, project, { headers: headers })  
      .pipe(  
        map(() => project),  
        catchError(this.handleError)  
      );  
  }  
  
  private handleError(err) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  
  
  private initializeProject(): Project {  
    return {  
      id: null,  
      displayName: null,  
      sponsorStudyName: null,  
      alternateId: null,  
      status: null, 
      sponsor: null  
    };  
  }  
}