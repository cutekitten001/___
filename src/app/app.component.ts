import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tlv-bov';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Força a verificação do estado de autenticação ao iniciar o app
    this.authService.initAuth();
  }
}