import { Order } from '@modules/orders/Entity/orders.entity';
import { CreatePaymentDto } from '@modules/payment/Dto/paymentDto';
import { PaymentMethod } from '@modules/payment/Entity/payment-method.entity';
import { Payment } from '@modules/payment/Entity/payment.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepo: Repository<PaymentMethod>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async getAllPaymentMethods() {
    return await this.paymentMethodRepo.find();
  }

  async getOne(id: number) {
    return await this.paymentRepo.findOne({ where: { id } });
  }

  async create(data: any) {
    const newPaymentMethod = await this.paymentMethodRepo.create(data);

    return await this.paymentMethodRepo.save(newPaymentMethod);
  }

  async update(id: number, data: any) {
    const paymentMethod = await this.paymentMethodRepo.findOne({
      where: { id },
    });

    if (!paymentMethod) {
      throw new NotFoundException(`Payment Method con ID ${id} no existe`);
    }

    Object.assign(paymentMethod, data);

    return await this.paymentMethodRepo.save(paymentMethod);
  }

  async createPayment(dto: CreatePaymentDto) {
    const order = await this.orderRepository.findOne({
      where: { id: dto.order_id },
      relations: ['payments'],
    });

    if (!order) {
      throw new NotFoundException(`Orden con ID ${dto.order_id} no encontrada`);
    }

    const method = await this.paymentMethodRepo.findOne({
      where: { id: dto.method_id },
    });
    if (!method) {
      throw new NotFoundException(
        `Método de pago con ID ${dto.method_id} no encontrado`,
      );
    }

    const totalPagado =
      order.payments?.reduce((acc, pago) => acc + Number(pago.amount), 0) || 0;
    const pendiente = Number(order.total) - totalPagado;

    if (dto.amount > pendiente) {
      throw new BadRequestException(
        `El monto excede el total pendiente de $${pendiente}`,
      );
    }

    const pago = this.paymentRepo.create({
      order,
      method,
      amount: dto.amount,
    });

    await this.paymentRepo.save(pago);

    // ✅ Marcar orden como pagada si ya está completamente cubierta
    const nuevoTotalPagado = totalPagado + Number(dto.amount);
    if (nuevoTotalPagado >= Number(order.total)) {
      order.state = 'Pagada'; // Asegúrate que este estado existe en la enum
      await this.orderRepository.save(order);
    }

    return {
      message: 'Pago registrado exitosamente',
      pago,
      total_pagado: nuevoTotalPagado,
      total_orden: Number(order.total),
      saldo_pendiente: Number(order.total) - nuevoTotalPagado,
    };
  }

  //obtener pagos de una orden
  async getPaymentsByOrder(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['payments', 'payments.method'],
    });

    if (!order) {
      throw new NotFoundException(`Orden con ID ${orderId} no encontrada`);
    }

    const totalPaid = order.payments.reduce(
      (acc, pago) => acc + Number(pago.amount),
      0,
    );
    const totalOrder = Number(order.total);

    return {
      order_id: order.id,
      total_order: totalOrder,
      total_paid: totalPaid,
      pending_amount: totalOrder - totalPaid,
      payments: order.payments.map((p) => ({
        id: p.id,
        method: p.method.name,
        amount: Number(p.amount),
        paid_at: p.paidAt,
      })),
    };
  }
}
