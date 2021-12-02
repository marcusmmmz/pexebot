import { Dict } from "../utils";

export interface TransactionResult {
	error: transactionErrors | null;
}
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

export function getUserMonetaryInfo(id: string) {
	let monetaryInfo = usersMonetaryInfo[id];

	if (monetaryInfo == undefined) {
		usersMonetaryInfo[id] = {
			balance: 10,
		};
		monetaryInfo = usersMonetaryInfo[id];
	}

	return monetaryInfo;
}
function changeUserBalance(userId: string, balance: number) {
	usersMonetaryInfo[userId].balance = balance;
}

// Payments

export function payUser(
	payerId: string,
	payeeId: string,
	amount: number
): TransactionResult {
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

export function printMoney(amount: number) {
	changeUserBalance(CENTRAL_BANK_ACCOUNT, amount);
}
export function lendMoney(user: string, amount: number) {
	payUser(CENTRAL_BANK_ACCOUNT, user, amount);
}
