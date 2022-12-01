export class Helpers {
  static createRandomIntegers(num: number): string {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let string = '';
    let length = 0;
    while (length < num) {
      string += numbers[Math.floor(Math.random() * 10)];
      length++;
    }
    return string;
  }
}
