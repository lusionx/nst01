/**
 * 只引入有controller 的 module
 */

import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
    imports: [CatsModule],
    providers: [],
})
export class AppModule {}
