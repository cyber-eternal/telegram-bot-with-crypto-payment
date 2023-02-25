import { Telegraf } from 'telegraf';
import { IBotContext } from '../interface/context.interface';

export abstract class AbstractCommand {
	constructor(public bot: Telegraf<IBotContext>) {}

	abstract handler(): void;
}
