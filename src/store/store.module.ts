/**
 * 在自己的 module 里定义 imports: [StoreModule] 后
 * 直接 import XXX from xxx.service 使用,
 * 这里注入是要进行初始化, 不必依赖 di 使用,
 * 因为 class 本身就是单例
 * -----providers item------
 * useFactory 利用被注入 其他 provider
 * inject 不能为值, 如果是值, 直接用就行, 没必要注入了
 */

import { Module } from '@nestjs/common';
import { ConfigService } from 'src/shared/config.service';
import { SharedModule } from 'src/shared/shared.module';
import { AppUserService } from './app-user.service';

@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: AppUserService,
            useFactory: AppUserService.inject,
            inject: [ConfigService],
        },
    ],
})
export class StoreModule {}
