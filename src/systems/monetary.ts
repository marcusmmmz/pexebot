import { Dict } from "../utils";

export interface IMonetaryInfo {
	balance: number;
}

export enum transactionErrors {
	INSUFFICIENT_FUNDS,
	INVALID_AMOUNT,
	SAME_PAYER_AND_PAYEE,
}

export const CENTRAL_BANK_ACCOUNT = "banco central";

let usersMonetaryInfo: Dict<IMonetaryInfo> = {};
usersMonetaryInfo[CENTRAL_BANK_ACCOUNT] = {
	balance: 0,
};

// Base functions

function createAccount(userId: string) {
	return (usersMonetaryInfo[userId] = {
		balance: 0,
	});
}
export function getUserMonetaryInfo(id: string) {
	return usersMonetaryInfo[id] ?? createAccount(id);
}
function changeUserBalance(userId: string, balance: number) {
	(usersMonetaryInfo[userId] ?? createAccount(userId)).balance = balance;
}

// Payments
export function payUser(
	payerId: string,
	payeeId: string,
	amount: number
): { error: transactionErrors | null } {
	if (getUserMonetaryInfo(payerId).balance < amount)
		return {
			error: transactionErrors.INSUFFICIENT_FUNDS,
		};
	if (amount !== Math.abs(amount))
		return {
			error: transactionErrors.INVALID_AMOUNT,
		};
	if (payerId == payeeId)
		return {
			error: transactionErrors.SAME_PAYER_AND_PAYEE,
		};

	changeUserBalance(payerId, getUserMonetaryInfo(payerId).balance - amount);
	changeUserBalance(payeeId, getUserMonetaryInfo(payeeId).balance + amount);

	return {
		error: null,
	};
}

// Central bank
export function lendMoney(user: string, amount: number) {
	changeUserBalance(user, getUserMonetaryInfo(user).balance + amount);
}
