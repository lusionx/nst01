import { Model, Optional, DataTypes } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../shared/config.service';

export interface AppUserAttr {
    id: number;
    name: string;
}

type Attr4Create = Optional<AppUserAttr, 'id'>;

let hasInit = false;

@Injectable()
export class AppUserService extends Model<AppUserAttr, Attr4Create> {
    static inject(config: ConfigService) {
        if (hasInit) return AppUserService;
        AppUserService.init(
            {
                id: {
                    type: DataTypes.NUMBER.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                },
            },
            {
                tableName: 'app_user',
                modelName: AppUserService.name,
                freezeTableName: true,
                updatedAt: false,
                sequelize: config.sequelize,
            },
        );
        hasInit = true;
        return AppUserService;
    }
}
