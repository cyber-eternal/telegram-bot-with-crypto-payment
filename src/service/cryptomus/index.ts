import { ICryptomusService } from './cryptomus.interface';

export class CryptomusService implements ICryptomusService {
  createInvoice(amount: number, order_id: string, currency: string): void {}
  check(id: string): void {}
}
