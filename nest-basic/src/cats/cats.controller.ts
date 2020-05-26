import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CatsService } from './cats.service'


@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Post('find-one')
    findOne(@Body() body: any) {
        return this.catsService.findOne(body.catname);
    }

    @Post()
    create(@Body() createCatDto) {
        return 'This action adds a new cat';
    }

    @Get()
    findAll(@Query() query) {
        return `This action returns all cats (limit: ${query.limit} items)`;
    }

    // @Get(':id')
    // findOne(@Param('id') id) {
    //     return `This action returns a #${id} cat`;
    // }

    @Put(':id')
    update(@Param('id') id, @Body() updateCatDto) {
        return `This put action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id) {
        return `This delete action removes a #${id} cat`;
    }
}
