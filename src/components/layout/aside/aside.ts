import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FileSearchIcon,
  Hamburger,
  Image,
  LayoutGrid,
  LogOut,
  LucideAngularModule,
  Table,
  Tags,
  User,
  Utensils,
} from 'lucide-angular';
import { cx } from '@/utils/cx';
import { AuthService } from '@/services/auth/auth-service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getRole } from '@/utils/getRole';
import { Link } from '@/components/ui/link/link';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [Link, RouterLink, FormsModule, LucideAngularModule],
  templateUrl: './aside.html',
})
export class Aside implements AfterViewInit {
  readonly LayoutGridIcon = LayoutGrid;
  readonly UtensilsIcon = Utensils;
  readonly LogOutIcon = LogOut;
  readonly UserIcon = User;
  readonly GaleryIcon = Image;
  readonly TagsIcon = Tags;
  readonly TableIcon = Table;
  readonly OrdenesIcon = Hamburger;
  readonly FileSearchIcon = FileSearchIcon;

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
