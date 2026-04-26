import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  FormArray, 
  Validators, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './matricula.html',
  styleUrl: './matricula.css'
})
export class Matricula {
  formMatricula: FormGroup;
  exibirResumo = false;

  constructor(private fb: FormBuilder) {
    // Configuração inicial do formulário reativo
    this.formMatricula = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefones: this.fb.array([this.fb.control('', Validators.required)]),
      idade: ['', [Validators.required, Validators.min(18)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      genero: ['', Validators.required],
      cidade: ['', Validators.required],
      termos: [false, Validators.requiredTrue]
    }, { 
      // Validador de grupo para comparar as duas senhas
      validators: this.validarSenhasIguais 
    });
  }

  get listaTelefones() {
    return this.formMatricula.get('telefones') as FormArray;
  }

  adicionarTelefone(): void {
    this.listaTelefones.push(this.fb.control('', Validators.required));
  }

  removerTelefone(index: number): void {
    if (this.listaTelefones.length > 1) {
      this.listaTelefones.removeAt(index);
    }
  }

  validarSenhasIguais(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha')?.value;
    const confirmar = control.get('confirmarSenha')?.value;
    // Se forem diferentes, retorna o erro 'senhasDiferentes'
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  /**
   * Centraliza as mensagens de erro de cada campo.
   * Retorna a string do erro ou null se o campo estiver correto ou não foi tocado.
   */
  obterMensagemErro(nomeCampo: string): string | null {
    const campo = this.formMatricula.get(nomeCampo);

    if (campo && campo.invalid && (campo.touched || campo.dirty)) {
      if (campo.hasError('required')) return 'Este campo é obrigatório.';
      if (campo.hasError('minlength')) return 'O texto é curto demais.';
      if (campo.hasError('email')) return 'O formato do e-mail é inválido.';
      if (campo.hasError('min')) return 'A idade mínima permitida é 18 anos.';
      if (campo.hasError('requiredTrue')) return 'Deve aceitar os termos para prosseguir.';
    }
    return null;
  }

  /**
   * Verifica especificamente o erro de comparação de senhas no grupo.
   */
  isSenhasDiferentes(): boolean {
    const confirmar = this.formMatricula.get('confirmarSenha');
    return !!(this.formMatricula.hasError('senhasDiferentes') && (confirmar?.touched || confirmar?.dirty));
  }

  aoEnviar(): void {
    if (this.formMatricula.valid) {
      this.exibirResumo = true;
      console.log('Dados submetidos:', this.formMatricula.value);
    }
  }
}