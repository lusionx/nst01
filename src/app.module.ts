import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CatsModule, SharedModule],
  providers: [],
})
export class AppModule {}
