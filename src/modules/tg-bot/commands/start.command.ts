import { Telegraf, Markup } from 'telegraf';
import { IBotContext } from '../interface/context.interface';
import { AbstractCommand } from './abstract.command';

export class StartCommand extends AbstractCommand {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handler(): void {
    this.bot.start((ctx) => {
      ctx.reply(
        'Do you like?',
        Markup.inlineKeyboard([
          Markup.button.callback('👍', 'like'),
          Markup.button.callback('👎', 'dislike'),
        ]),
      );
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
