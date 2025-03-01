import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfileService } from '@core/service/profile.service';
import { Profile } from '@shared/interfaces/profile.interface';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'edit', 'delete'];
  profiles: Profile[] = [];

  constructor(
    private router: Router,
    private matSnackBar: MatSnackBar,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.finAll().subscribe({
      next: (profiles) => {
        this.profiles = profiles;
      },
      error: (err) => {
        this.matSnackBar.open(
          err.error?.message || 'Erro ao carregar perfis',
          'Erro',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            direction: 'rtl',
            duration: 3000,
          }
        );
      },
    });
  }

  editProfile(profile: any) {
    if (!profile.id)
      this.matSnackBar.open('Erro ao tentar editar perfil.', 'Erro', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        direction: 'rtl',
      });
    this.router.navigate([`/perfil/${profile.id}`]);
  }

  deleteProfile(profile: any) {
    this.profileService.delete(profile.id).subscribe((data) => {
      this.matSnackBar.open(data, 'Sucesso', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        direction: 'rtl',
      });
    });
    this.loadProfile();
  }
}
