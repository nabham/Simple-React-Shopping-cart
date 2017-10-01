
export default function CarReducer(state = { items: [] }, action) {
    switch (action.type) {
        case 'LOAD_ITEMS': {
            let new_items = action.data.map((item) => Object.assign({}, item, { quant: 1 }))
            return Object.assign({}, state, { items: new_items })
        }
        case 'REMOVE_ITEM': {
            let new_items = state.items.filter((item) => item.id !== parseInt(action.data));
            console.log(new_items, action.data);
            return Object.assign({}, state, { items: new_items })
        }
        case 'CHANGE_QUANT': {
            let id = parseInt(action.data.id);
            let quant = parseInt(action.data.quant);
            let new_items = state.items.map((item) => {
                if (item.id === id) {
                    item.quant += quant
                }
                return item
            })
            return Object.assign({}, state, { items: new_items })
        }
        case 'PUSH_FROM_STORAGE': {
            return Object.assign({}, state, { items: action.data });
        }
        default:
            return state;
    }
}
