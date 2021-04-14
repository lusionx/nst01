import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { RoleGuard, SetRoles } from 'src/common/guards/role.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@UseGuards(AuthGuard)
@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto);
    }

    @Get()
    @UseGuards(RoleGuard)
    @SetRoles('admin')
    findAll() {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.catsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return this.catsService.update(+id, updateCatDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.catsService.remove(+id);
    }
}
