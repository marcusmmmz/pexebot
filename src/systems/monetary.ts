import type { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import db from "../db";

export interface IMonetaryInfo {
	balance: number;
}

export enum transactionErrors {
	INSUFFICIENT_FUNDS,
	INVALID_AMOUNT,
	ONLY_INTEGERS_ALLOWED,
	SAME_PAYER_AND_PAYEE,
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

// Payments
export async function payUser(
	payerId: string,
	payeeId: string,
	amount: number
): Promise<{ error: transactionErrors | null }> {
	let { balance } = await getUserMonetaryInfo(payerId);

	if (balance < amount)
		return {
			error: transactionErrors.INSUFFICIENT_FUNDS,
		};
	if (amount <= 0)
		return {
			error: transactionErrors.INVALID_AMOUNT,
		};
	if (Math.floor(amount) !== amount)
		return {
			error: transactionErrors.ONLY_INTEGERS_ALLOWED,
		};
	if (payerId == payeeId)
		return {
			error: transactionErrors.SAME_PAYER_AND_PAYEE,
		};

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

	return {
		error: null,
	};
}

// Central bank
export async function lendMoney(id: string, amount: number) {
	return await db.user.upsert({
		where: { id },
		create: { id, balance: amount },
		update: { balance: { increment: amount } },
	});
}
