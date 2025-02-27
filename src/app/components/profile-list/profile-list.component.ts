import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent {
  displayedColumns: string[] = ['name', 'actions'];

  @Input() profiles = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Gente e Cultura' },
    { id: 3, name: 'Colaborador Comum' },
  ];

  editProfile(profile: any) {
    console.log('Editar perfil:', profile);
  }
}
