import { PensamentoService } from 'src/app/services/pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.instanciarFormulario();
  }

  criarPensamento() {
    if (this.formulario.invalid) return;

    this.pensamentoService.criar(this.formulario.value).subscribe({
      next: () => this.retornarAListagem(),
      error: (err) => {
        console.error(err);
        alert('Erro ao salvar pensamento');
      }
    });
  }

  instanciarFormulario() {
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])
      ],
      autoria: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])
      ],
      modelo: [1, [Validators.required]]
    })
  }

  retornarAListagem() {
    this.router.navigate(['/listar-pensamento']);
  }

  habilitarBotaoSalvar(): string {
    if (this.formulario.valid) return 'botao';
    return 'botao__desabilitado';
  }
}
