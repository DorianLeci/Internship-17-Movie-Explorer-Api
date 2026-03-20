import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isNotPastDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const date = new Date(value);
          const now = new Date();

          return date.getTime() >= now.getTime();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} cannot be in the past`;
        },
      },
    });
  };
}
