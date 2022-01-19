import { Dict } from "../utils";

export interface IMonetaryInfo {
	balance: number;
}

export class TransactionError extends Error {
	constructor(
		public type:
			| "INSUFFICIENT_FUNDS"
			| "INVALID_AMOUNT"
			| "SAME_PAYER_AND_PAYEE"
	) {
		super(type);
	}
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
export function payUser(payerId: string, payeeId: string, amount: number) {
	if (getUserMonetaryInfo(payerId).balance < amount)
		throw new TransactionError("INSUFFICIENT_FUNDS");
	if (amount !== Math.abs(amount)) throw new TransactionError("INVALID_AMOUNT");
	if (payerId == payeeId) throw new TransactionError("SAME_PAYER_AND_PAYEE");

	changeUserBalance(payerId, getUserMonetaryInfo(payerId).balance - amount);
	changeUserBalance(payeeId, getUserMonetaryInfo(payeeId).balance + amount);
}

// Central bank
export function lendMoney(user: string, amount: number) {
	changeUserBalance(user, getUserMonetaryInfo(user).balance + amount);
}
