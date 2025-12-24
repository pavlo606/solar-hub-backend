import { Module } from '@nestjs/common';
import { {{Name}}Controller } from './{{name}}.controller';
import { {{Name}}Service } from './{{name}}.service';
import { {{Name}}Repository } from './{{name}}.repository';

@Module({
  controllers: [{{Name}}Controller],
  providers: [{{Name}}Service, {{Name}}Repository],
  exports: [{{Name}}Service],
})
export class {{Name}}Module {}
