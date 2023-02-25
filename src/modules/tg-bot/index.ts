import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { tgConfig } from '../../config';
import { AbstractCommand } from './commands/abstract.command';
import { StartCommand } from './commands/start.command';
import { IBotContext } from './interface/context.interface';

export class TgBot {
  bot: Telegraf<IBotContext>;
  commands: AbstractCommand[] = [];

  constructor() {
    this.bot = new Telegraf<IBotContext>(tgConfig.TOKEN);
    this.bot.use(
      new LocalSession({
        database: `./${tgConfig.SESSION_DB_FILE}`,
      }).middleware(),
    );
  }

  init() {
    this.commands.push(new StartCommand(this.bot));
    this.commands.forEach((command) => {
      command.handler();
    });
    this.bot.launch();
  }
}
