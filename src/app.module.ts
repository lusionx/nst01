/**
 * 只引入有controller 的 module
 */

import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { SharedModule } from './shared/shared.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
    imports: [CatsModule, SharedModule, DogsModule],
    providers: [],
})
export class AppModule {}
