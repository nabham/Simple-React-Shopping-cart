import React from 'react';

import TotalPrice from './Totalprice';
import Items from './Items';

export default class Home extends React.Component {


    constructor() {
        super();
        this.state = {
            isRemoved: 'none',
            removedItem: ''
        }
        this.toggleOverlay = this.toggleOverlay.bind(this);
    }


    toggleOverlay(e) {
        this.setState({ isRemoved: 'block', removedItem: e });
        clearTimeout(timer);
        var timer = setTimeout(() => {
            this.setState({ isRemoved: 'none', removedItem: '' })
        }, 4000)
    }

    render() {

        return (
            <div>
                <div className={"overlay"} style={{ display: this.state.isRemoved }}>
                    {this.state.removedItem} is removed from cart
                </div>
                <div className={"container"}>
                    <Items removed={this.toggleOverlay} />
                    <TotalPrice />
                </div>
            </div>
        )
    }
}