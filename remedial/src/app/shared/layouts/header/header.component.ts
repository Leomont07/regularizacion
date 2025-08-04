import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Login', routerLink: '/login' },
    { label: 'Registro', routerLink: '/register' }
  ];
}