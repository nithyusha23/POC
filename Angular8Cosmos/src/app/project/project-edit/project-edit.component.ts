import { Component, OnInit, OnDestroy } from '@angular/core';    
import { FormGroup, FormBuilder, Validators } from '@angular/forms';    
import { Subscription } from 'rxjs';    
import { ActivatedRoute, Router } from '@angular/router';    
import { Project } from '../project';  
import { ProjectService } from '../project.service';  
import { GenericValidator } from 'src/app/shared/genericvalidator';  
    
@Component({    
  selector: 'app-project-edit',    
  templateUrl: './project-edit.component.html',    
  styleUrls: ['./project-edit.component.css']    
})    
export class ProjectEditComponent implements OnInit, OnDestroy {    
  pageTitle = 'Project Edit';    
  errorMessage: string;    
  projectForm: FormGroup;    
  tranMode: string;    
  project: Project;    
  private sub: Subscription;    
    
  displayMessage: { [key: string]: string } = {};    
  private validationMessages: { [key: string]: { [key: string]: string } };    
  genericValidator: GenericValidator;    
    
    
  constructor(private fb: FormBuilder,    
    private route: ActivatedRoute,    
    private router: Router,    
    private projectService: ProjectService) {    
    
    this.validationMessages = {    
      displayName: {    
        required: 'Project name is required.',    
        minlength: 'Project name must be at least three characters.',    
        maxlength: 'Project name cannot exceed 50 characters.'    
      },    
      sponsor: {    
        required: 'Project sponsor name is required.',    
      }    
    };    
    this.genericValidator = new GenericValidator(this.validationMessages);    
  }    
    
  ngOnInit() {    
    this.tranMode = "new";    
    this.projectForm = this.fb.group({    
      displayName: ['', [Validators.required,    
      Validators.minLength(3),    
      Validators.maxLength(50)    
      ]],    
      alternateId: '',    
      sponsor: ['', [Validators.required]],    
      sponsorStudyName: '',    
      status: ''    
    });    
    
    this.sub = this.route.paramMap.subscribe(    
      params => {    
        const id = params.get('id');    
        const sponsor = params.get('sponsor');    
        if (id == '0') {    
          const project: Project = { id: "0", displayName: "", alternateId: [{key: "", value: ""}], sponsor: "", sponsorStudyName: "", status: ""};    
          this.displayProject(project);    
        }    
        else {    
          this.getProject(id, sponsor);    
        }    
      }    
    );    
  }    
    
  ngOnDestroy(): void {    
    this.sub.unsubscribe();    
  }    
    
  getProject(id: string, sponsor: string): void {    
    this.projectService.getProject(id, sponsor)    
      .subscribe(    
        (project: Project) => this.displayProject(project),    
        (error: any) => this.errorMessage = <any>error    
      );    
  }    
    
  displayProject(project: Project): void {    
    if (this.projectForm) {    
      this.projectForm.reset();    
    }    
    this.project = project;    
    if (this.project.id == '0') {    
      this.pageTitle = 'Add Project';    
    } else {    
      this.pageTitle = `Edit Project: ${this.project.displayName}`;    
    }    
    this.projectForm.patchValue({    
      displayName: this.project.displayName,    
      alternateId: this.project.alternateId[0].value,    
      sponsor: this.project.sponsor,    
      sponsorStudyName: this.project.sponsorStudyName,    
      status: this.project.status    
    });    
  }    
    
  deleteProject(): void {    
    if (this.project.id == '0') {    
      this.onSaveComplete();    
    } else {    
      if (confirm(`Are you sure want to delete this Project: ${this.project.displayName}?`)) {    
        this.projectService.deleteProject(this.project.id, this.project.displayName)    
          .subscribe(    
            () => this.onSaveComplete(),    
            (error: any) => this.errorMessage = <any>error    
          );    
      }    
    }    
  }    
    
  saveProject(): void {    
    if (this.projectForm.valid) {    
      if (this.projectForm.dirty) {    
        const p = { ...this.project, ...this.projectForm.value };    
        if (p.id === '0') {
          p.alternateId = [{"key": "SponsorProjectID",
          "value": p.alternateId}];     
          this.projectService.createProject(p)    
            .subscribe(    
              () => this.onSaveComplete(),    
              (error: any) => this.errorMessage = <any>error    
            );    
        } else { 
          p.alternateId = [{"key": "SponsorProjectID",
          "value": p.alternateId}];   
          this.projectService.updateProject(p)    
            .subscribe(    
              () => this.onSaveComplete(),    
              (error: any) => this.errorMessage = <any>error    
            );    
        }    
      } else {    
        this.onSaveComplete();    
      }    
    } else {    
      this.errorMessage = 'Please correct the validation errors.';    
    }    
  }    
    
  onSaveComplete(): void {    
    this.projectForm.reset();    
    this.router.navigate(['/projects']);    
  }    
}