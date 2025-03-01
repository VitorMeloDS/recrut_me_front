import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InviteService } from '@core/service/invite.service';
import { Invite } from '@shared/interfaces/invite.interface';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.scss'],
})
export class InviteListComponent implements OnInit {
  invites: Invite[] = [];
  displayedColumns: string[] = [
    'email',
    'status',
    'created_at',
    'expires_at',
    'actions',
  ];
  newEmail: string = '';

  constructor(
    private inviteService: InviteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInvites();
  }

  loadInvites() {
    this.inviteService.getInvites().subscribe((data: any) => {
      this.invites = data;
    });
  }

  sendInvite() {
    if (!this.newEmail) return;

    this.inviteService.createInvite(this.newEmail).subscribe({
      next: (value: any) => {
        this.snackBar.open(
          value.message || 'Convite enviado com sucesso!',
          'Fechar',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            direction: 'rtl',
            duration: 3000,
          }
        );

        this.newEmail = '';
        this.loadInvites();
      },
      error: (err: any) => {
        this.snackBar.open(err.message || 'Erro ao enviar convite!', 'Fechar', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          direction: 'rtl',
          duration: 3000,
        });
      },
    });
  }
}
