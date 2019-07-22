import { Component, OnInit } from '@angular/core';    
import { ActivatedRoute, Router } from '@angular/router';    
import { Project } from '../project';  
import { ProjectService } from '../project.service';  
    
@Component({    
  selector: 'app-project-detail',    
  templateUrl: './project-detail.component.html',    
  styleUrls: ['./project-detail.component.css']    
})    
export class ProjectDetailComponent implements OnInit {    
  pageTitle = 'Project Detail';    
  errorMessage = '';    
  project: Project | undefined;    
    
  constructor(private route: ActivatedRoute,    
    private router: Router,    
    private projectService: ProjectService) { }    
    
  ngOnInit() {    
    const displayName = this.route.snapshot.paramMap.get('displayName');    
    const sponsor = this.route.snapshot.paramMap.get('sponsor');    
    if (displayName && sponsor) {    
      this.getProject(sponsor, displayName);    
    }    
  }    
    
  getProject(sponsor: string, displayName: string) {    
    this.projectService.getProject(sponsor, displayName).subscribe(    
      project => this.project = project,    
      error => this.errorMessage = <any>error);    
  }    
    
  onBack(): void {    
    this.router.navigate(['/projects']);    
  }    
}