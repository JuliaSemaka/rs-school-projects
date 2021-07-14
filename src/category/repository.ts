import { listcards } from "../cards/repository";

export const categories: string[] = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Chapes', 'Fruits'];

export function getCategories(): Promise<string[]> {
    return Promise.resolve(categories);
}

export function deleteCategory(indexCategory: number): Promise<void> {
    const cardIndex = indexCategory in categories;
    if (!cardIndex) {
        return Promise.reject(new Error('Card not found'));
    }
    categories.splice(indexCategory, 1);
    listcards[indexCategory].splice(indexCategory, 1);
    return Promise.resolve();
}