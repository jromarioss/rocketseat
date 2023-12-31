import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodError, ZodSchema  } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue; //permite fazer a validação e transformação
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error)
        }); //forma o error de forma mais visual
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
