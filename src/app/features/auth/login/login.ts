import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMobileScreen
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './login.html',
  styleUrl: './login.sass',
})
export class Login {
  faMobileScreen = faMobileScreen;
  step: 'phone' | 'otp' = 'phone';

  phoneNumber = '';
  otp = '';
  loading = false;

  handleSendOTP() {
    // event.preventDefault();

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

  handleVerifyOTP() {
    // event.preventDefault();

    if (this.otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      alert('Login successful! (Demo)');
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
