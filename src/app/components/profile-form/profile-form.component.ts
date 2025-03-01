import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Profile } from '@shared/interfaces/profile.interface';
import { ProfileService } from '@core/service/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from '@core/service/menu.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  protected form!: FormGroup;
  protected id: string | null = null;
  protected pageTitle: string = 'Criar Perfil';
  @Input() protected menus: any[] = [];

  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly profileService: ProfileService,
    private readonly menuService: MenuService,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')?.replace(/\D/g, '')) {
        this.id = params.get('id');
        this.pageTitle = 'Editar Perfil';
        this.loadProfileData(this.id);
      }
    });

    this.loadMenus();

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      menus: [[], Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  loadMenus(): void {
    this.menuService.finAll().subscribe((menus) => {
      this.menus = menus.map((menu: any) => ({
        ...menu,
        selected: false,
      }));
    });
  }

  loadProfileData(id: string | null): void {
    if (!id) {
      this.matSnackBar.open('Erro ao carregar perfil.', 'Erro', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        direction: 'rtl',
      });
      this.router.navigate([`/perfil`]);
      return;
    }

    this.profileService.find(id).subscribe((profile: Profile | null) => {
      this.form.patchValue({
        name: profile?.name,
        menus: profile?.menus.map((menu: any) => menu.id),
      });

      this.menus.forEach((menu) => {
        if (profile?.menus.some((pMenu: any) => pMenu.id === menu.id)) {
          menu.selected = true;
        }
      });
    });
  }

  onMenuToggle(menuId: number): void {
    const selectedMenus = this.form.value.menus as number[];
    const index = selectedMenus.indexOf(menuId);

    if (index === -1) {
      selectedMenus.push(menuId);
    } else {
      selectedMenus.splice(index, 1);
    }

    this.form.patchValue({ menus: selectedMenus });
  }

  handleSaveOrUpdate(str: string): void {
    if (this.form.valid) {
      if (this.id && 'update' === str) {
        this.profileService
          .update(this.id, this.form.value)
          .subscribe((response: any) => {
            if (!response)
              this.matSnackBar.open(response || 'Perfil atualizado.', 'Info', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                direction: 'rtl',
              });
            this.router.navigate([`/perfil`]);
          });
      } else {
        this.profileService.create(this.form.value).subscribe((response) => {
          if (!response)
            this.matSnackBar.open(response || 'Perfil criado.', 'Info', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              direction: 'rtl',
            });
          this.router.navigate([`/perfil`]);
        });
      }
    }
  }
}
