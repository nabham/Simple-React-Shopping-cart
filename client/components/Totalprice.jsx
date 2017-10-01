import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

export class TotalPrice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            total_discount: 0,
            final_price: 0,
            type_discount: 0,
            total_number: 0
        }
        this.calculatePrice = this.calculatePrice.bind(this);
    }

    calculatePrice(data) {
        let t_price = 0;
        let t_discount = 0;
        let type_discount = 0;
        let total_number = 0;
        data.items.forEach((item) => {
            total_number += item.quant;
            t_price += item.price * item.quant;
            if (item.type === "fiction") {
                type_discount += item.price * item.quant * .15;
            }
            t_discount += item.price * item.quant * (item.discount / 100);
        })
        this.setState({
            total: t_price,
            total_discount: t_discount,
            type_discount: type_discount,
            final_price: t_price - t_discount - type_discount,
            total_number
        })
    }

    componentWillMount() {
        this.calculatePrice(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.calculatePrice(nextProps)
    }

    render() {
        return (
            <div className={"container-item-2"}>
                <div className={"container-item-2-1"}>
                    <div className={"total-header"}><strong>Total</strong></div>
                    <br />
                    <div>Items({this.state.total_number}):<span className={"price"}>${this.state.total}</span></div>
                    <br />
                    <div>Discount:<span className={"price"}>${this.state.total_discount}</span></div>
                    <div>Type discount:<span className={"price"}>${this.state.type_discount}</span></div>
                </div>
                <div className={"total-order"}>Order total:<span className={"price"}><strong>${this.state.final_price}</strong></span></div>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(TotalPrice);