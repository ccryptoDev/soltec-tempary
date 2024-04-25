import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInputComponent } from './auth-input/auth-input.component';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { ProfileModalComponent } from '../../components/modals/profile-modal/profile-modal.component';
import { ProjectInputComponent } from './project-input/project-input.component';
import { PermissionDropdownComponent } from './permission-dropdown/permission-dropdown.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StepbarComponent } from './stepbar/stepbar.component';

@NgModule({
  declarations: [
    AuthInputComponent,
    PageHeaderComponent,
    SidebarComponent,
    CustomDropdownComponent,
    ProfileModalComponent,
    ProjectInputComponent,
    PermissionDropdownComponent,
    BreadcrumbComponent,
    StepbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [
    AuthInputComponent,
    ProjectInputComponent,
    PageHeaderComponent,
    SidebarComponent,
    CustomDropdownComponent,
    ProfileModalComponent,
    PermissionDropdownComponent,
    BreadcrumbComponent,
    StepbarComponent,
  ],
})
export class SharedModule {}
