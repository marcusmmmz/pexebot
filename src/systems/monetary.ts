import type { Prisma } from "@prisma/client";
import db from "../db";
import { makeFail, makeSuccess } from "../utils";

export interface IMonetaryInfo {
	balance: number;
}

// Formatting

export function formatPexes(number: number) {
	return Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		maximumFractionDigits: 0,
	})
		.format(number)
		.replace("R", "P");
}

// Base functions

async function createAccount(data: Prisma.UserCreateInput) {
	return await db.user.create({ data });
}

export async function getUserMonetaryInfo(id: string) {
	return (
		(await db.user.findUnique({
			where: { id },
			select: { balance: true },
		})) ?? (await createAccount({ id }))
	);
}

export enum PaymentErrors {
	INSUFFICIENT_FUNDS,
	INVALID_AMOUNT,
	ONLY_INTEGERS_ALLOWED,
	SAME_PAYER_AND_PAYEE,
}
export async function payUser(
	payerId: string,
	payeeId: string,
	amount: number
) {
	let { balance } = await getUserMonetaryInfo(payerId);

	if (balance < amount) return makeFail(PaymentErrors.INSUFFICIENT_FUNDS);
	if (amount <= 0) return makeFail(PaymentErrors.INVALID_AMOUNT);
	if (Math.floor(amount) !== amount)
		return makeFail(PaymentErrors.ONLY_INTEGERS_ALLOWED);
	if (payerId == payeeId) return makeFail(PaymentErrors.SAME_PAYER_AND_PAYEE);

	await db.$transaction([
		db.user.upsert({
			where: { id: payerId },
			create: { id: payerId, balance: amount },
			update: { balance: { decrement: amount } },
		}),
		db.user.upsert({
			where: { id: payeeId },
			create: { id: payeeId, balance: amount },
			update: { balance: { increment: amount } },
		}),
	]);

	return makeSuccess(null);
}

// Central bank
export async function lendMoney(id: string, amount: number) {
	return await db.user.upsert({
		where: { id },
		create: { id, balance: amount },
		update: { balance: { increment: amount } },
	});
}
