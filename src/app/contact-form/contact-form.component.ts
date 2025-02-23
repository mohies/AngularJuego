import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(10)]),
      plataforma: new FormControl('', Validators.required),
      aceptarTerminos: new FormControl(false, Validators.requiredTrue)
    });
  }

  enviarFormulario(): void {
    if (this.contactForm.valid) {
      const { asunto, mensaje } = this.contactForm.value;

      const mailtoLink = `mailto:soporte@gamezone.com?subject=${asunto}&body=${mensaje}`;
  
      window.location.href = mailtoLink;
    }
  }
  
}
