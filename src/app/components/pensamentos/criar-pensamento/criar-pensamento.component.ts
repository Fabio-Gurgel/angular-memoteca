import { PensamentoService } from 'src/app/services/pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: 1,
  };

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  criarPensamento() {
    this.pensamentoService.criar(this.pensamento).subscribe({
      next: () => this.retornarAListagem(),
      error: (err) => {
        console.error(err);
        alert('Erro ao salvar pensamento');
      }
    });
  }

  retornarAListagem() {
    this.router.navigate(['/listar-pensamento']);
  }
}
