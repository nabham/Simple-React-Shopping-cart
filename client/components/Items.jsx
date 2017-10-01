import React from 'react';
import * as $ from 'jquery';
import { connect } from 'react-redux';
import { loadItems, removeItem, changeItemQuant, pushIntoCart } from './../actions/actions';

import Item from './Item';

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loaditems: (items) => {
            dispatch(loadItems(items))
        },
        removeItem: (id) => {
            dispatch(removeItem(id))
        },
        changeItemQuant: (id, qt) => {
            dispatch(changeItemQuant(id, qt))
        },
        pushitems: (data) => {
            dispatch(pushIntoCart(data))
        }
    }

}

export class Items extends React.Component {
    constructor() {
        super();
        this.state = {
            isError: true
        }
        this.removeItem = this.removeItem.bind(this);
        this.changeQuant = this.changeQuant.bind(this);
        this.reloadData = this.reloadData.bind(this);
    }

    reloadData() {
        $.ajax({
            url: "./items.json",
            method: "GET",
            success: (data) => {
                this.setState({ isError: false })
                this.props.loaditems(data);
            },
            error: (error) => {
                this.setState({ isError: true })
            }
        })
    }

    componentWillMount() {
        if (sessionStorage.getItem("cart")) {
            this.setState({ isError: false });
            this.props.pushitems(JSON.parse(sessionStorage.getItem("cart")));
        }
        else {
            this.reloadData();
        }
    }

    componentWillUpdate(nextProps) {
        sessionStorage.setItem("cart", JSON.stringify(nextProps.items));
    }


    removeItem(e) {
        this.props.removeItem(e.target.value.split(',')[0]);
        // this.setState({isRemoved:'block',removedItem:});
        this.props.removed(e.target.value.split(',')[1]);
    }

    changeQuant(e) {
        this.props.changeItemQuant(e.target.value.split(',')[0], e.target.value.split(',')[1]);
    }

    render() {
        let rows = [];
        this.props.items.forEach((element) => {
            rows.push(
                <Item key={element.id} element={element} removeitem={this.removeItem} changeQty={this.changeQuant} />
            )
        });
        return (
            <div className={"container-item-1"}>
                <div className={"page-header"}>Order Summary</div>
                <div className={"item-header"}>
                    <div className={"item-name-1"}>Items({this.props.items.length})</div>
                    <div className={"item-quant"} style={{ marginLeft: '3%' }}>Qty</div>
                    <div className={"item-price"} style={{ marginLeft: '3%' }}>Price</div>
                </div>
                {this.state.isError ? <div>No records Found</div> : rows}
                {rows.length == 0 ? <button className={"reload-button"} onClick={this.reloadData}>Reload Data</button> : null}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);