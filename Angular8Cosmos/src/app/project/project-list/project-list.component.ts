import { Component, OnInit } from '@angular/core';    
import { Project } from '../project';  
import { ProjectService } from '../project.service';  

@Component({    
  selector: 'app-project-list',    
  templateUrl: './project-list.component.html',    
  styleUrls: ['./project-list.component.css']    
})    
export class ProjectListComponent implements OnInit {    
  pageTitle = 'Project List';    
  filteredProjects: Project[] = [];    
  projects: Project[] = [];    
  errorMessage = '';    
    
  _listFilter = '';    
  get listFilter(): string {    
    return this._listFilter;    
  }    
  set listFilter(value: string) {    
    this._listFilter = value;    
    this.filteredProjects = this.listFilter ? this.performFilter(this.listFilter) : this.projects;    
  }    
    
  constructor(private projectService: ProjectService) { }    
    
  performFilter(filterBy: string): Project[] {    
    filterBy = filterBy.toLocaleLowerCase();    
    return this.projects.filter((project: Project) =>    
    project.alternateId[0].value.toLocaleLowerCase().indexOf(filterBy) !== -1 || project.displayName.toLocaleLowerCase().indexOf(filterBy) !== -1 || project.sponsorStudyName.toLocaleLowerCase().indexOf(filterBy) !== -1);    
  }    
    
  ngOnInit(): void {    
    this.projectService.getProjects().subscribe(    
      projects => {    
        this.projects = projects;    
        this.filteredProjects = this.projects;    
      },    
      error => this.errorMessage = <any>error    
    );    
  }    
    
  deleteProject(id: string, name: string, sponsor: string): void {    
    if (id === '') {    
      this.onSaveComplete();    
    } else {    
      if (confirm(`Are you sure want to delete this Project: ${name}?`)) {    
        this.projectService.deleteProject(id, name)    
          .subscribe(    
            () => this.onSaveComplete(),    
            (error: any) => this.errorMessage = <any>error    
          );    
      }    
    }    
  }    
    
  onSaveComplete(): void {    
    this.projectService.getProjects().subscribe(    
      projects => {    
        this.projects = projects;    
        this.filteredProjects = this.projects;    
      },    
      error => this.errorMessage = <any>error    
    );    
  }    
    
}