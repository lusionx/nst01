/**
 * 定义3个东西
 * - 字段接口
 * - modelStore: 在 inject 里完成 init; 实现需要的实例方法
 * - Service: 把原来的静态方法做为 service 的实例方法
 * **********************
 * sequelize.model 不符合 st 要求, 不该使用静态方法
 * 需要多做一些函数修正
 * - findByPk > single
 */

import { Model, Optional, DataTypes, FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../shared/config.service';

export interface AppUserAttr {
    id: number;
    name: string;
    /** role t1 */
    role: string;
}

type Attr4Create = Optional<AppUserAttr, 'id'>;

let hasInit = false;

@Injectable()
export class AppUserStore
    extends Model<AppUserAttr, Attr4Create>
    implements AppUserAttr {
    id: number;
    name: string;
    role: string;

    saveSilent(fields?: (keyof AppUserAttr)[]) {
        return this.save({ fields, silent: true });
    }

    static inject(config: ConfigService) {
        if (hasInit) return AppUserStore;
        AppUserStore.init(
            {
                id: {
                    type: DataTypes.NUMBER.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                },
                role: {
                    type: DataTypes.STRING,
                },
            },
            {
                tableName: 'user',
                modelName: AppUserStore.name,
                freezeTableName: true,
                sequelize: config.sequelize,
            },
        );
        hasInit = true;
        return AppUserStore;
    }
}

@Injectable()
export class AppUserService {
    single(id: number) {
        return AppUserStore.findByPk(id);
    }
    findAll(opt: FindOptions<AppUserAttr>) {
        return AppUserStore.findAll(opt);
    }
}
