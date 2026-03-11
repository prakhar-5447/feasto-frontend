import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './signup.html',
  styleUrl: './signup.sass',
})
export class Signup {
  faUser = faUser;

  step: 'phone' | 'otp' | 'details' = 'phone';

  phoneNumber = '';
  otp = '';

  formData = {
    name: '',
    email: ''
  };

  loading = false;

  handleSendOTP(event: Event) {
    event.preventDefault();

    if (this.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.step = 'otp';
    }, 1000);
  }

  handleVerifyOTP(event: Event) {
    event.preventDefault();

    if (this.otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.step = 'details';
    }, 1000);
  }

  handleSignup(event: Event) {
    event.preventDefault();

    if (!this.formData.name.trim()) {
      alert('Please enter your name');
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      alert('Account created successfully! (Demo)');
    }, 1000);
  }

  handleResendOTP() {
    alert('OTP resent successfully! (Demo)');
  }

  onPhoneChange(value: string) {
    this.phoneNumber = value.replace(/\D/g, '').slice(0, 10);
  }

  onOtpChange(value: string) {
    this.otp = value.replace(/\D/g, '').slice(0, 6);
  }

}
