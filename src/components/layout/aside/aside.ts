import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import {
  Image,
  LayoutGrid,
  LogOut,
  LucideAngularModule,
  Tags,
  User,
  Utensils,
} from 'lucide-angular';
import { cx } from '../../../utils/cx';
import { Link } from '../../ui/link/link';
import { AuthService } from '../../../services/auth/auth-service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getRole } from '../../../utils/getRole';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [LucideAngularModule, Link, RouterLink, FormsModule],
  templateUrl: './aside.html',
})
export class Aside implements AfterViewInit {
  readonly LayoutGridIcon = LayoutGrid;
  readonly UtensilsIcon = Utensils;
  readonly LogOutIcon = LogOut;
  readonly UserIcon = User;
  readonly GaleryIcon = Image;
  readonly TagsIcon = Tags;

  authService = inject(AuthService);
  isOpen = false;
  @ViewChild('userDropdown') userDropdown!: ElementRef<HTMLDivElement>;

  currentRoute: string = '';
  cx = cx;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngAfterViewInit() {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        !this.userDropdown.nativeElement.contains(event.target as Node) &&
        event.target !== this.userDropdown.nativeElement
      ) {
        console.log('Clicked outside');
        this.isOpen = false;
      }
    };
    document.addEventListener('click', handleOutsideClick);
  }

  parseRole() {
    return getRole(this.authService.user?.role || '');
  }
}
