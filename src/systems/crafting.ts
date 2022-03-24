import { makeFail, makeSuccess } from "../utils";
import { addItem, getInventory, ItemStack, removeItemById } from "./inventory";

export interface Crafting {
	input: ItemStack[];
	output: ItemStack[];
}
export function Crafting(
	input: Crafting["input"],
	output: Crafting["output"]
): Crafting {
	return { input, output };
}

let craftings: Crafting[] = [];

export async function canUserCraft(userId: string, crafting: Crafting) {
	let invSlots = getInventory(userId);
	let ingredients = crafting.input;

	return ingredients.every((ingredient) => {
		let item = invSlots.find((invSlot) => invSlot.itemID == ingredient.itemID);

		if (!item) return false;
		if (item?.amount < ingredient.amount) return false;

		return true;
	});
}

export async function listAvailableCraftings(userId: string) {
	return craftings.filter((crafting) => canUserCraft(userId, crafting));
}

export enum CraftErrors {
	USER_CANT_CRAFT,
}
export async function craft(userId: string, crafting: Crafting) {
	if (!(await canUserCraft(userId, crafting)))
		return makeFail(CraftErrors.USER_CANT_CRAFT);

	crafting.input.forEach((stack) => {
		removeItemById(stack, userId);
	});

	crafting.output.forEach((stack) => addItem(stack, userId));

	return makeSuccess(crafting.output);
}

export async function getCraftingByOutput(outputID: string) {
	// This supports only one output
	return craftings.find((crafting) => crafting.output[0].itemID == outputID);
}

export async function registerCrafting(crafting: Crafting) {
	craftings.push(crafting);
}
