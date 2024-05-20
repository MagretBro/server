import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { request } from "http";
import { Observable } from "rxjs";
import { CategoryService } from "src/category/category.service";
import { TransactionService } from "src/transaction/transaction.service";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private readonly transacctionService: TransactionService,
        private readonly categoryService: CategoryService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const { id, type } = request.params

        let entity

        switch (type) {
            case 'transaction':
                entity = await this.transacctionService.findOne(id)
                break
            case 'category':
                entity = await this.categoryService.findOne(id)
                break
            default:
                throw new NotFoundException('Smth went wrong')
        }

        const user = request.user

        if (entity && user && entity.user.id === user.id)
            {return true}
        throw new BadRequestException('Smth went wrong')

        }
    }
