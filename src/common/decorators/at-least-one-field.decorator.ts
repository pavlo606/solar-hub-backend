import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function AtLeastOneField(
  fields: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'atLeastOneField',
      target: object.constructor,
      propertyName,
      options: {
        message: 'At least one field must be provided for update',
        ...validationOptions,
      },
      constraints: [fields],
      validator: {
        validate(_: any, args: ValidationArguments) {
          const [fieldNames] = args.constraints;
          return fieldNames.some((field: string) => args.object[field] !== undefined);
        },
      },
    });
  };
}