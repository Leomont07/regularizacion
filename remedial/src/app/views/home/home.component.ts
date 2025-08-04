import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, InputTextModule, FormsModule, MessageModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  newItem: string = '';
  successMessage: string | undefined = undefined;
  errorMessage: string | undefined = undefined;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error al cargar los ítems';
      }
    });
  }

  addItem() {
    this.successMessage = undefined;
    this.errorMessage = undefined;
    this.itemService.createItem(this.newItem).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.newItem = '';
        this.ngOnInit(); // Refrescar lista
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error al crear el ítem';
      }
    });
  }
}