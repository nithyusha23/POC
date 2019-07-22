import { BrowserModule } from '@angular/platform-browser';  
import { NgModule } from '@angular/core';  
import { HttpClientModule } from '@angular/common/http';  
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router';  
  
import { AppRoutingModule } from './app-routing.module';  
import { AppComponent } from './app.component';  
import { HeaderComponent } from './ui/header/header.component';  
import { FooterComponent } from './ui/footer/footer.component';  
import { LayoutComponent } from './ui/layout/layout.component';
import { MenuComponent } from './ui/menu/menu.component';  
import { HomeComponent } from './home/home.component';  
import { ProjectListComponent } from './project/project-list/project-list.component';  
import { ProjectEditComponent } from './project/project-edit/project-edit.component';  
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';  
import { ProjectEditGuard } from './project/project-edit/project-edit-guard';  
import { ProjectService } from './project/project.service';
  
  
@NgModule({  
  declarations: [  
    AppComponent,  
    HeaderComponent,  
    FooterComponent,  
    LayoutComponent,  
    HomeComponent,  
    ProjectListComponent,  
    ProjectEditComponent,  
    ProjectDetailComponent, 
    MenuComponent  
  ],  
  imports: [  
    BrowserModule,  
    AppRoutingModule,  
    HttpClientModule,  
    ReactiveFormsModule,  
    FormsModule,  
    RouterModule.forRoot([  
      {  
        path: 'home',  
        component: HomeComponent  
      },  
      {  
        path: 'projects',  
        component: ProjectListComponent  
      },  
      {  
        path: 'projects/:sponsor/:displayName',  
        component: ProjectDetailComponent  
      },  
      {  
        path: 'projects/:id/:sponsor/edit',  
        canDeactivate: [ProjectEditGuard],  
        component: ProjectEditComponent  
      },  
      {  
        path: '',  
        redirectTo: 'home',  
        pathMatch: 'full'  
      },  
      {  
        path: '**',  
        redirectTo: 'home',  
        pathMatch: 'full'  
      }  
    ])  
  ],  
  providers: [  
    ProjectService  
  ],  
  bootstrap: [AppComponent]  
})  
export class AppModule { }