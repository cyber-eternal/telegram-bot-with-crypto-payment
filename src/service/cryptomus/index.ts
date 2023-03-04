import { cryptomusConfig } from '@app/config/cryptomus';
import { ICreateInvoiceResult, ICryptomusService } from './cryptomus.interface';
import crypto from 'crypto';
import axios from 'axios';
export class CryptomusServiceFactory implements ICryptomusService {
  private apiKey: string;
  private merchantId: string;

  constructor() {
    this.apiKey = cryptomusConfig.API_KEY;
    this.merchantId = cryptomusConfig.MERCHANT_ID;
  }
  async createInvoice(amount: number, orderId: string, currency: string) {
    try {
      console.log('this.merchantId', this.merchantId);
      const payload = {
        amount: amount.toString(),
        orderId,
        currency,
      };

      const { data } = await axios.post<ICreateInvoiceResult>(
        'https://api.cryptomus.com/v1/payment',
        payload,
        { headers: this.getHeader(JSON.stringify(payload)) },
      );

      return data as ICreateInvoiceResult;
    } catch (e) {
      console.log('e', e);
    }
  }

  async check(id: string) {
    try {
      const payload = {
        uuid: id,
      };

      const { data } = await axios.post<ICreateInvoiceResult>(
        'https://api.cryptomus.com/v1/payment/info',
        payload,
        { headers: this.getHeader(JSON.stringify(payload)) },
      );

      return data as ICreateInvoiceResult;
    } catch (e) {
      console.log('e', e);
    }
  }

  getHeader(payload: string) {
    const sign = crypto
      .createHash('md5')
      .update(Buffer.from(payload).toString('base64') + this.apiKey)
      .digest('hex');

    return {
      merchantId: this.merchantId,
      sign,
    };
  }
}

export const CryptomusService = new CryptomusServiceFactory();
