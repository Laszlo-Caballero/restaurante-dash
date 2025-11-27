import { Component, Input } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { LucideAngularModule, PenLine, Trash, X } from 'lucide-angular';
import { Tabs } from '@/components/ui/tabs/tabs';
import { TabHeader } from '@/components/ui/tab-header/tab-header';
import { TabButton } from '@/components/ui/tab-button/tab-button';
import { ResponseMesa } from '@/interfaces/response.interface';
import { TabList } from '@/components/ui/tab-list/tab-list';
import { Tab } from '@/components/ui/tab/tab';
import { UpdateMesa } from '../update-mesa/update-mesa';
import { DeleteMesa } from '../delete-mesa/delete-mesa';

@Component({
  selector: 'app-modal-options-mesa',
  imports: [
    Modal,
    LucideAngularModule,
    Tabs,
    TabHeader,
    TabButton,
    TabList,
    Tab,
    UpdateMesa,
    DeleteMesa,
  ],
  templateUrl: './modal-options-mesa.html',
})
export class ModalOptionsMesa {
  @Input({ required: true }) onClose!: () => void;
  @Input({ required: true }) mesa!: ResponseMesa;

  XIcon = X;
  EditIcon = PenLine;
  DeleteIcon = Trash;
}
