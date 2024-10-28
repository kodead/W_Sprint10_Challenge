import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderHistoryQuery } from '../state/pizzaApi';
import { setSizeFilter } from '../state/sizeFilterSlice';

export default function OrderList() {
  const { data: orders = [], error, isLoading } = useGetOrderHistoryQuery();
  const dispatch = useDispatch();
  const sizeFilter = useSelector((state) => state.sizeFilter);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  // Filter orders based on size
  const filteredOrders = sizeFilter === 'All' ? orders : orders.filter(order => order.size === sizeFilter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map((order) => (
            <li key={order.id}>  
              <div>
                <p>{order.customer} ordered a size {order.size} with {Array.isArray(order.toppings) ? order.toppings.length : 0} toppings</p>  
              </div>
            </li>
          ))
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const isActive = size === sizeFilter;
            const className = `button-filter${isActive ? ' active' : ''}`;
            return (
              <button
                data-testid={`filterBtn${size}`}
                className={className}
                key={size}
                onClick={() => dispatch(setSizeFilter(size))}  
              >
                {size}
              </button>
            );
          })
        }
      </div>
    </div>
  );
}