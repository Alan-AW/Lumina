

export function numberToFixed(value: number, length: number) {
    if (value > 0) {
      return parseFloat(value.toFixed(length));
    }
    return 0;
  }
  