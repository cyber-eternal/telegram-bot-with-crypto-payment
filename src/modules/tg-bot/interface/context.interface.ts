import { Context } from 'telegraf';

export interface ISessionData {
	like: boolean;
}

export interface IBotContext extends Context {
	session: ISessionData;
}
