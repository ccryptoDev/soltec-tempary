import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './common/shared/shared.module';
import { TooltipModule } from './common/tooltip/tooltip.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './services/auth-interceptor';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LayoutComponent } from './layout/layout.component';
import { ActiveColumnDirective } from './utils/active-column.directive';
import { PermissionRequestModalComponent } from './components/modals/permission-request-modal/permission-request-modal.component';
import { SuccessModalComponent } from './components/modals/success-modal/success-modal.component';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectConfigModalComponent } from './components/modals/project-config-modal/project-config-modal.component';
import { CreateProjectModalComponent } from './components/modals/create-project-modal/create-project-modal.component';
import { ShareProjectModalComponent } from './components/modals/share-project-modal/share-project-modal.component';
import { InstanceComponent } from './components/instance/instance.component';
import { CreateInstanceModalComponent } from './components/modals/create-instance-modal/create-instance-modal.component';
import { SelectInstanceModalComponent } from './components/modals/select-instance-modal/select-instance-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProjectsComponent,
    LayoutComponent,
    ActiveColumnDirective,
    PermissionRequestModalComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    ProjectDetailComponent,
    ProjectConfigModalComponent,
    CreateProjectModalComponent,
    ShareProjectModalComponent,
    InstanceComponent,
    CreateInstanceModalComponent,
    SelectInstanceModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    TooltipModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
