export interface User {
  id: number;
  email: string;
  name: string;
}

class AuthService {
  private users: User[] = [
    { id: 1, email: 'demo@example.com', name: 'Demo User' }
  ];
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    // In production, verify password hash
    if (password.length < 6) {
      throw new Error('Invalid password');
    }

    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }

  async signup(email: string, password: string, name: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists
    if (this.users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    // Validate email
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength
    if (!this.isStrongPassword(password)) {
      throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
    }

    const newUser: User = {
      id: this.users.length + 1,
      email,
      name
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  }

  async getCurrentUser(): Promise<User | null> {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    return null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isStrongPassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
  }
}

export const authService = new AuthService();