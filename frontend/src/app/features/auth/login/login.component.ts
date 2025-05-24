import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AvatarSelectionComponent } from '../avatar-selection/avatar-selection.component';

@Component({
  selector: 'card-fancy-example',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSignUp = false;

  constructor(private dialog: MatDialog) {}

  handleSubmit() {
  if (this.isSignUp) {
    this.onSignupSubmit();
  } else {
    // login logic placeholder
    console.log('Login clicked');
  }
}

  toggleForm(): void {
    this.isSignUp = !this.isSignUp;
  }

  onSignupSubmit() {
    // Your signup logic here...

    // After successful signup:
    this.openAvatarSelection();
  }

  openAvatarSelection() {
    const dialogRef = this.dialog.open(AvatarSelectionComponent, {
      width: '600px',
      disableClose: true,
      panelClass: 'avatar-selection-dialog'
    });

    dialogRef.componentInstance.avatarSelected.subscribe((avatar: any) => {
      console.log('User selected avatar:', avatar);
      dialogRef.close();
      // Save avatar info to user profile and proceed
    });
  }
}
