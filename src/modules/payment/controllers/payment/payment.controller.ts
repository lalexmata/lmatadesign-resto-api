import { PaymentService } from '@payment/services/payment/payment.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePaymentDto } from '@modules/payment/Dto/paymentDto';

@Controller('payment')
export class PaymentController {

    constructor(
        private paymentService: PaymentService
    ){}

    @Get()
    getAll(){
        
    }

    @Post()
    async create(@Body() dto: CreatePaymentDto) {
        return this.paymentService.createPayment(dto);
    }
}
