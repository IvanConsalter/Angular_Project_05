export class StringUtils {

  public static isNullOrEmpty(value: string): boolean {
    if(value === undefined || value === null || value.trim() === '') {
      return true;
    }
    return false;
  }

  public static onlyNumber(number: string): string {
    return number.replace(/[^0-9]/g, '');
  }
}
