import React, { useState, useEffect } from 'react';
import './Menu.css';
import { menuService } from '../../_services/menu.service';
import { ordersService } from '../../_services/orders.service';
import { Dish, OrderItem } from '../../_lib/types';
import { useHistory } from 'react-router-dom';

export default function Menu() {

    const history = useHistory();

    const [menu, setMenu] = useState<Dish[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        menuService.getDish()
            .then(
                data => {
                    setMenu(data);
                    const array = new Array(data.length);
                    array.fill(0);
                    setSelected(array);
                },
                error => alert(error)
            )
    }, [])

    const minus = (index: number) => {
        const count = selected[index];
        const array = Array.from(selected);
        array[index] = count - 1;
        setSelected(array);
    } 

    const add = (index: number) => {
        const count = selected[index];
        const array = Array.from(selected);
        array[index] = count + 1;
        setSelected(array);
    }

    const onSubmit = () => {
        if (!selected) return;
        const items: OrderItem[] = [];
        selected.forEach((e, index) => {
            if (e > 0) {
                items.push({ 
                    dish: menu[index],
                    quantity: e
                } as OrderItem)
            }
        })
        if (items.length === 0) return;
        ordersService.createOrder(items)
            .then(
                data => history.push('/orders'),
                error => alert(error)
            )
    }

	return (
        <>
            <div className="wrapper">
                <div className="container menu">
                    {
                        menu.map((dish, index) => (
                            <div key={index} className="menu-item-wrapper">
                                {
                                    selected[index] ? (
                                        <div className="controls">
                                            <div className="count"> { selected[index] } </div>
                                            <div className="minus" onClick={_ => minus(index)}></div>
                                        </div>
                                    ) : null
                                }
                                <div className="menu-item" onClick={_ => add(index)}>
                                    <div className="menu-item-image" style={{backgroundImage: `url("/images/${dish.id}.jpg")`}}>
                                        
                                    </div>
                                    <p>
                                        { dish.name }
                                    </p>
                                    <p className="price">
                                        { dish.price }$
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                selected && selected.filter(e => e > 0).length > 0 && (
                    <div className="order">
                        <div className="order-button" onClick={onSubmit}>ORDER</div>
                    </div>
                )
            }
        </>
	);
}
