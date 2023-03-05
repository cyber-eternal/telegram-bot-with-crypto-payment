import { Context } from 'telegraf';

export interface ISessionData {
	pay: boolean;
}

export interface IBotContext extends Context {
	session: ISessionData;
}
