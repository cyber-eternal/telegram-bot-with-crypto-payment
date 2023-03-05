import { CryptomusService } from '@app/service';
import { randomUUID } from 'crypto';
import { Telegraf, Markup } from 'telegraf';
import { IBotContext } from '../interface/context.interface';
import { AbstractCommand } from './abstract.command';

export class StartCommand extends AbstractCommand {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handler(): void {
    this.bot.start(async (ctx) => {
      ctx.reply(
        'Do you want to pay?',
        Markup.inlineKeyboard([
          Markup.button.callback('➕', 'pay_yes'),
          Markup.button.callback('➖', 'pay_no'),
        ]),
      );
    });

    this.bot.action('pay_yes', async (ctx) => {
      ctx.session.pay = true;

      const invoice = await CryptomusService.createInvoice(
        10,
        randomUUID(),
        'USD',
      );

      if (!invoice) {
        ctx.reply('Failed to create invoice');
      } else {
        ctx.reply(invoice.result.url);
      }

      ctx.reply('👍');
    });
    this.bot.action('pay_no', (ctx) => {
      ctx.session.pay = false;
      ctx.reply('🥺');
    });
  }
}
