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
      const invoice = await CryptomusService.createInvoice(
        10,
        randomUUID(),
        'USD',
      );

      console.log(invoice);

      if (!invoice) {
        ctx.reply('Failed to create invoice');
      } else {
        ctx.reply(invoice.result.url );
        // ctx.reply(
        //   'Do you like?',
        //   Markup.inlineKeyboard([
        //     Markup.button.callback('👍', 'like'),
        //     Markup.button.callback('👎', 'dislike'),
        //   ]),
        // );
      }
    });

    this.bot.action('like', (ctx) => {
      ctx.session.like = true;
      ctx.reply('👍');
    });
    this.bot.action('dislike', (ctx) => {
      ctx.session.like = false;
      ctx.reply('🥺');
    });
  }
}
