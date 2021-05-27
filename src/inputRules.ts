export const requiredRule = (val: unknown) => !!val || 'This field is required';

export const minRule = (min: number, inclusive = false) => (val: unknown) => (inclusive
  ? (Number(val) >= min)
  : (Number(val) > min))
  || `Minimum is ${min}`;
