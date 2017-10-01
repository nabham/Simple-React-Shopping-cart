

export function loadItems(data) {
    return {
        type: 'LOAD_ITEMS',
        data
    }
}

export function removeItem(id) {
    return {
        type: 'REMOVE_ITEM',
        data: id
    }
}

export function changeItemQuant(id, qt) {
    return {
        type: 'CHANGE_QUANT',
        data: {
            id: id,
            quant: qt
        }
    }
}

export function pushIntoCart(data) {
    return {
        type: 'PUSH_FROM_STORAGE',
        data
    }
}