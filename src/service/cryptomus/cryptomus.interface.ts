export interface ICurrency {
  currency: string;
  network: string;
}

export interface IResult {
  uuid: string;
  order_id: string;
  amount: string;
  payment_amount: string;
  payer_amount: string;
  payer_currency: string;
  currency: string;
  comments?: any;
  network: string;
  address?: any;
  from?: any;
  txid?: any;
  payment_status: string;
  url: string;
  expired_at: number;
  status: string;
  is_final: boolean;
  additional_data?: any;
  currencies: ICurrency[];
}

export interface ICreateInvoiceResult {
  state: number;
  result: IResult;
}

export interface ICryptomusService {
  createInvoice(
    amount: number,
    orderId: string,
    currency: string,
  ): Promise<ICreateInvoiceResult | undefined>;
  check(id: string): Promise<ICreateInvoiceResult | undefined>;
  getHeader(payload: string): {
    merchant: string;
    sign: string;
  };
}
