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
      const payload = {
        amount: amount.toString(),
        order_id: orderId,
        currency,
      };

      const { data } = await axios.post<ICreateInvoiceResult>(
        `${cryptomusConfig.API_URL}/payment`,
        payload,
        { headers: this.getHeader(JSON.stringify(payload)) },
      );

      return data as ICreateInvoiceResult;
    } catch (e) {
      console.log('e', e.response.data);
    }
  }

  async check(id: string) {
    try {
      const payload = {
        uuid: id,
      };

      const { data } = await axios.post<ICreateInvoiceResult>(
        `${cryptomusConfig.API_URL}/info`,
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
      merchant: this.merchantId,
      sign,
    };
  }
}

export const CryptomusService = new CryptomusServiceFactory();
