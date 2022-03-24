import { Dict, makeFail } from "../utils";

export interface ItemStack {
	itemID: string;
	amount: number;
}
export function ItemStack(itemID: string, amount: number) {
	return { itemID, amount };
}

let inventories: Dict<ItemStack[]> = {};

export const formatItemStack = ({ amount, itemID }: ItemStack) =>
	`${amount} ${itemID}`;

export const formatItemStacks = (itemStacks: ItemStack[]) =>
	itemStacks.length !== 0
		? itemStacks.map(formatItemStack).join(", ")
		: "Nenhum";

export function getInventory(id: string) {
	return inventories[id] ?? createInventory(id);
}

export function createInventory(id: string) {
	return (inventories[id] = []);
}

export function hasItem(itemId: string, amount: number, user: string) {
	if (
		getInventory(user).find(
			(slot) => slot.itemID == itemId && slot.amount >= amount
		)
	)
		return true;
	else return false;
}

export function addItem(stack: ItemStack, user: string) {
	getInventory(user).push(stack);
}

export enum RemoveItemErrors {
	USER_DOESNT_HAVE_ITEM,
	USER_DOESNT_HAVE_ENOUGH_ITEMS,
}
export function removeItemById(stack: ItemStack, user: string) {
	let slots = getInventory(user);

	let slot = slots.find(({ itemID }) => itemID == stack.itemID);

	if (!slot) return makeFail(RemoveItemErrors.USER_DOESNT_HAVE_ITEM);

	slot.amount -= stack.amount;

	if (slot.amount == 0) {
		inventories[user] = slots.filter(({ itemID }) => itemID !== stack.itemID);
	}

	if (slot.amount < 0) {
		return makeFail(RemoveItemErrors.USER_DOESNT_HAVE_ENOUGH_ITEMS);
	}
}

export function giveItem(item: ItemStack, to: string) {
	addItem(item, to);
}
