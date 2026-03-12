import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMobileScreen
} from '@fortawesome/free-solid-svg-icons';

type AuthStep = 'phone' | 'otp' | 'details';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './auth.html',
  styleUrl: './auth.sass',
})
export class Auth {
  step: AuthStep = 'phone';
  faMobileScreen = faMobileScreen;

  phoneNumber = '';
  name = '';
  email = '';

  loading = false;

  otpArray = [0, 1, 2, 3, 4, 5];
  otpValues = ['', '', '', '', '', ''];

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private router: Router) { }

  get otp(): string {
    return this.otpValues.join('');
  }

  sendOTP() {

    if (this.phoneNumber.length !== 10) return;

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.step = 'otp';

      setTimeout(() => {
        this.otpInputs.first.nativeElement.focus();
      });
    }, 800);
  }

  verifyOTP() {

    if (this.otp.length !== 6) return;

    this.loading = true;

    setTimeout(() => {

      this.loading = false;

      // simulate API response
      const existingUser = Math.random() > 0.5;

      if (existingUser) {
        this.loginSuccess();
      } else {
        this.step = 'details';
      }

    }, 1000);
  }

  onOtpChange(any: any) { }
  resendOtp() { }
  completeSignup() {

    if (!this.name) return;

    this.loading = true;

    setTimeout(() => {
      this.loginSuccess();
    }, 1000);
  }

  loginSuccess() {
    alert('Login success');
    this.router.navigate(['/app']);
  }

  onPhoneChange(value: string) {
    this.phoneNumber = value.replace(/\D/g, '').slice(0, 10);
  }

  onOtpInput(event: Event, index: number) {

    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    if (!value) return;

    this.otpValues[index] = value;

    const next = this.otpInputs.get(index + 1);
    if (next) next.nativeElement.focus();
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {

    if (event.key === 'Backspace') {

      if (!this.otpValues[index]) {
        const prev = this.otpInputs.get(index - 1);
        if (prev) prev.nativeElement.focus();
      }

      this.otpValues[index] = '';
    }
  }
}
