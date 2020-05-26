import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    findOne(catname: String): string {
        if (catname == 'kid') {
            return 'kid is here'
        }
        return 'no one here'
    }
}
