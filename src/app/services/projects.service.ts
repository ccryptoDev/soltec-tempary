import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project, ProjectDetailData, ProjectDetails } from '../models/project.model';
import { InstanceTracker } from '../models/instance.model'


@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  createProject(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects`, requestBody);
  }

  accessRequest(projectId: number, requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${projectId}/request-access`, requestBody);
  }

  getProjectDetail(projectId: string): Observable<any> {
    return this.http.get<ProjectDetailData>(`${this.apiUrl}/projects/${projectId}`);
  }

  updateProjectDetail(projectId: any, requestBody: ProjectDetails): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projects/${projectId}`, requestBody);
  }

  shareProjectMembers(projectId: string, requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/share`, requestBody);
  }

  getProjectMembers(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${projectId}/share`);
  }

  createInstance(projectId: string, requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/instances`, requestBody);
  }

  getInstance(projectId: string, instanceId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${projectId}/instances/${instanceId}`);
  }

  updateInstance(projectId: string, instanceId: string, requestBody: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projects/${projectId}/instances/${instanceId}`, requestBody);
  }

  deleteInstance(projectId: string, instanceId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/projects/${projectId}/instances/${instanceId}`);
  }

  getInstanceID(instanceId: string): Observable<InstanceTracker> {
    return this.http.get<InstanceTracker>(`${this.apiUrl}/pasos/paso2-1/${instanceId}`);
  }

}

