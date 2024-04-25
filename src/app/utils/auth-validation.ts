
export class AuthValidation {
  public static validateEmail(email: string) {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailPattern.test(email);
  }

  public static validatePassword(password: string, step: number) {
    switch(step) {
      case 1:
        return /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password);
      case 2:
        return /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
      case 3:
        return password.length >= 10;
      default:
        return false;
    }
  }
}
