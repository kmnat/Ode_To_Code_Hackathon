import { Component, EventEmitter, Output } from '@angular/core';

interface Avatar {
  name: string;
  image: string; // URL or local asset path
}

@Component({
  selector: 'app-avatar-selection',
  standalone: true,
  imports : [],
  templateUrl: './avatar-selection.component.html',
  styleUrls: ['./avatar-selection.component.scss']
})
export class AvatarSelectionComponent {
  avatars: Avatar[] = [
    { name: 'The Warrior', image: 'assets/avatars/warrior.png' },
    { name: 'The Mage', image: 'assets/avatars/mage.png' },
    { name: 'The Rogue', image: 'assets/avatars/rogue.png' },
    { name: 'The Archer', image: 'assets/avatars/archer.png' },
    { name: 'The Paladin', image: 'assets/avatars/paladin.png' },
    { name: 'The Assassin', image: 'assets/avatars/assassin.png' },
    { name: 'The Healer', image: 'assets/avatars/healer.png' },
    { name: 'The Necromancer', image: 'assets/avatars/necromancer.png' },
    { name: 'The Bard', image: 'assets/avatars/bard.png' },
    { name: 'The Druid', image: 'assets/avatars/druid.png' },
    // Add more avatars as you like
  ];

  selectedIndex: number | null = null;

  @Output() avatarSelected = new EventEmitter<Avatar>();

  selectAvatar(index: number) {
    this.selectedIndex = index;
  }

  confirmSelection() {
    if (this.selectedIndex !== null) {
      this.avatarSelected.emit(this.avatars[this.selectedIndex]);
    }
  }
}
