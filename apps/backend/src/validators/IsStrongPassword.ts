import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
          return typeof value === 'string' && passwordRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must have 8 characters and  contain at least one letter, one number and one special character';
        },
      },
    });
  };
}
