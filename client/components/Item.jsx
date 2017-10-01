import React from 'react';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"items"}>
                <div className={"item-name"}>
                    <img height="30" width="30" src={this.props.element.img_url} />
                    <span>{this.props.element.name}</span>
                    <button value={[this.props.element.id, this.props.element.name]} onClick={this.props.removeitem}>X</button>
                </div>
                <div className={"item-quant"}>
                    <button value={[this.props.element.id, -1]} onClick={this.props.changeQty} disabled={this.props.element.quant == 0}>-</button>
                    <span>{this.props.element.quant}</span>
                    <button value={[this.props.element.id, 1]} onClick={this.props.changeQty}>+</button>
                </div>
                <div className={"item-price"}><strong>${this.props.element.price * this.props.element.quant}</strong></div>
            </div>
        )
    }
}