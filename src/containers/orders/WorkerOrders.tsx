import React, { useState, useEffect } from 'react';
import { Order } from '../../_lib/types';
import { ordersService } from '../../_services/orders.service';
import './Orders.css';

export default function WorkerOrders() {

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        ordersService.getAllOrder()
            .then(
                data => setOrders(data),
                error => alert(error)
            )
    }, [])

    const onSubmit = (order: Order) => {
        ordersService.prepareOrder(order)
            .then(
                _ => window.location.reload(),
                error => alert(error)
            )
    }

	return (
        <>
            <div className="wrapper">
                <div className="container orders">
                    {
                        orders.map((order, index) => (
                            <div key={index} className="orders-item-wrapper">
                                <div className="orders-item">
                                    <div className="orders-item-header">
                                        <p>Order #{order.id}</p>
                                        <div className="confirmation-button" onClick={_ => onSubmit(order)}>
                                            READY
                                        </div>
                                    </div>
                                    <div className="order-items">
                                    {
                                        order.orderItems.map((item, index) => (
                                            Array.from(Array(item.quantity).keys()).map(dishIndex => (
                                                <div key={`${index} ${dishIndex}`} className="order-item-wrapper">
                                                    <div className="order-item">
                                                        <div className="order-item-image" style={{backgroundImage: `url("/images/${item.dish.id}.jpg")`}}>
                                                            
                                                        </div>
                                                        <p>
                                                            { item.dish.name }
                                                        </p>
                                                        <p className="price">
                                                            { item.dish.price }$
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
	);
}
