import { Dict } from "../utils";

interface ItemStack {
	itemID: string;
	amount: number;
}

let inventories: Dict<ItemStack[]> = {};

export const formatItemStack = ({ amount, itemID }: ItemStack) =>
	`${amount} ${itemID}`;

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

export function removeItemById(stack: ItemStack, user: string) {
	let slots = getInventory(user);

	let slot = slots.find(({ itemID }) => itemID == stack.itemID);

	if (!slot) return;

	slot.amount -= stack.amount;

	if (slot.amount == 0) {
		slots.filter(({ itemID }) => itemID == stack.itemID);
	}
}

export function giveItem(item: ItemStack, to: string) {
	addItem(item, to);
}
