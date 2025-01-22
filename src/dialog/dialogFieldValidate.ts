export const fieldValidate = {
  strAtRange(
    field: string = '',
    value: string = '',
    operator: '<=' | '>=' | '=',
    numberAtLeast: number = 0,
  ) {
    if (operator === '>=')
      return value.length < numberAtLeast
        ? `The ${field} must be at least ${numberAtLeast} characters long.`
        : null;

    if (operator === '<=')
      return value.length > numberAtLeast
        ? `The ${field} must not be more than ${numberAtLeast} characters.`
        : null;

    if (operator === '=')
      return value.length === numberAtLeast
        ? `The ${field} must be exactly ${numberAtLeast} characters.`
        : null;

    return 'invalid operator';
  },
};
