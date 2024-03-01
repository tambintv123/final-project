import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TypeService } from '../type.service';
import { Type } from '../entity/type.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateTypeRequest } from '../dtos/create.type.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Type')
@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get('getAll')
  async findAll(): Promise<Type[]> {
    return await this.typeService.getAllTypes();
  }

  @Post('create')
  async create(@Body() input: CreateTypeRequest): Promise<Type> {
    return await this.typeService.createType(input);
  }

  @Patch('update/:id')
  @ApiParam({
    name: 'id',
  })
  async update(
    @Param('id') id,
    @Body() input: CreateTypeRequest,
  ): Promise<Type> {
    const type = await this.typeService.getType(id);

    if (!type) {
      throw new NotFoundException();
    }

    return await this.typeService.updateType(type, input);
  }

  @Delete('remove/:id')
  @ApiParam({
    name: 'id',
  })
  @HttpCode(204)
  async remove(@Param('id') id): Promise<DeleteResult> {
    const type = await this.typeService.getType(id);

    if (!type) {
      throw new NotFoundException();
    }

    return await this.typeService.deleteType(id);
  }
}
