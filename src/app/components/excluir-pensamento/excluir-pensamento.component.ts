import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css'],
})
export class ExcluirPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: 1,
  };

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.obterPensamentoASerExcluido();
  }

  obterPensamentoASerExcluido() {
    const id = this.route.snapshot.paramMap.get('id');

    this.pensamentoService.buscarPorId(parseInt(id!)).subscribe({
      next: (pensamento) => { this.pensamento = pensamento },
      error: (err) => {
        console.error(err);
        alert('Erro ao obter pensamento');
      },
    });
  }

  excluirPensamento() {
    if (this.pensamento.id) {
      this.pensamentoService.excluir(this.pensamento.id).subscribe({
        next: () => this.retornarAListagem(),
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir pensamento');
        },
      });
    }
  }

  retornarAListagem() {
    this.router.navigate(['/listar-pensamento']);
  }
}
