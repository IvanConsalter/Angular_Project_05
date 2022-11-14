export class StringUtils {

  public static StringParaDecimal(valor: any): number {
    if (valor === null) return 0;

    valor = valor.replace(/\./g, '');
    valor = valor.replace(/,/g, '.');
    return parseFloat(valor);
}

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
