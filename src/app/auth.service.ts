
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: { email: string; password: string } | null = null;

  private readonly mockUsername = 'admin';
  private readonly mockPassword = 'admin123';

  registerUser(email: string, password: string): void {
    this.userData = { email, password };
  }

  validateUser(email: string, password: string): boolean {
    return this.userData !== null &&
           this.userData.email === email &&
           this.userData.password === password;
  }

  
  isRegistered(): boolean {
    return this.userData !== null;
  }

  
  login(username: string, password: string): boolean {
    return username === this.mockUsername && password === this.mockPassword;
  }
}
