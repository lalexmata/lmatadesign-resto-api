import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment/payment.controller';
import { PaymentService } from './services/payment/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './Entity/payment.entity';
import { PaymentMethod } from './Entity/payment-method.entity';
import { Order } from '@modules/orders/Entity/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, PaymentMethod, Order])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
