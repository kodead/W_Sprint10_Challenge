import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../state/pizzaApi';
import { setField, setTopping, resetForm } from '../state/ordersSlice';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.orders);  
  const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Redux state before submit:', ordersState);
  
    // Validate fullName and size
    if (!ordersState.size) {
      alert('size must be one of the following values: S, M, L');
      return
    }
    if (!ordersState.fullName) {
      alert(' fullName is required.');
      return;
    }
  
    // Collect selected toppings as an array of topping IDs
    const selectedToppings = Object.keys(ordersState.toppings)
      .filter((key) => ordersState.toppings[key]); // Keep the topping IDs (e.g., '1', '2')
  
    try {
      // Create the order using the selectedToppings (array of IDs)
      await createOrder({
        fullName: ordersState.fullName,
        size: ordersState.size,
        toppings: selectedToppings,  // Send IDs, not names
      });
      dispatch(resetForm());  // Reset form after successful submission
    } catch (error) {
      console.error('Order failed: ', error);
      if (error?.data?.message) {
        alert(error.data.message);
      }
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Redux state before submit:', ordersState);
  //   // Validate fullName and size
  //   if (!ordersState.fullName || !ordersState.size) {
  //     alert('Full Name and Size are Required.');
  //     return;
  //   }

  //   // Collect selected toppings from Redux state
  //   const selectedToppings = Object.keys(ordersState.toppings)  // Corrected from 'size' to 'toppings'
  //     .filter((key => ordersState.toppings[key]))
  //     .map(key => {
  //       if (key === '1') return 'Pepperoni';
  //       if (key === '2') return 'Green Peppers';
  //       if (key === '3') return 'Pineapple';
  //       if (key === '4') return 'Mushrooms';
  //       if (key === '5') return 'Ham';
  //     });

  //   try {
  //     await createOrder({
  //       fullName: ordersState.fullName,
  //       size: ordersState.size,
  //       toppings: selectedToppings,
  //     });
  //     dispatch(resetForm());  // Reset form after successful submission
  //   } catch (error) {
  //     console.error('Order failed: ', error);
  //     if (error?.data?.message) {
  //       alert(error.data.message)
  //     }
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setField({ field: name, value }));  // Dispatch to setField in Redux
  };

  const handleToppingChange = (e) => {
    const { name, checked } = e.target;
    dispatch(setTopping({ field: name, value: checked }));  // Dispatch to setTopping in Redux
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {isError && <div className='failure'>Order failed: fullName is required</div>}
      {isSuccess && <div className='success'>Order placed Successfully!</div>}

      <div className="input-group">
        <label htmlFor="fullName">Full Name</label><br />
        <input
          data-testid="fullNameInput"
          id="fullName"
          name="fullName"
          placeholder="Type full name"
          type="text"
          value={ordersState.fullName}  // Bind fullName from Redux state
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="size">Size</label><br />
        <select data-testid="sizeSelect" 
        id="size" 
        name="size" 
        value={ordersState.size} 
        onChange={handleChange}
        >
          <option value="">----Choose size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" 
          name="1" 
          type="checkbox" 
          checked={ordersState.toppings['1']} 
          onChange={handleToppingChange} />
          Pepperoni<br />
        </label>
        <label>
          <input data-testid="checkGreenpeppers" 
          name="2" 
          type="checkbox" 
          checked={ordersState.toppings['2']} 
          onChange={handleToppingChange} />
          Green Peppers<br />
        </label>
        <label>
          <input data-testid="checkPineapple" 
          name="3" 
          type="checkbox" 
          checked={ordersState.toppings['3']} 
          onChange={handleToppingChange} />
          Pineapple<br />
        </label>
        <label>
          <input data-testid="checkMushrooms" 
          name="4" 
          type="checkbox" 
          checked={ordersState.toppings['4']} 
          onChange={handleToppingChange} />
          Mushrooms<br />
        </label>
        <label>
          <input 
          data-testid="checkHam" 
          name="5" type="checkbox" 
          checked={ordersState.toppings['5']} 
          onChange={handleToppingChange} />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
      {/* <button type="submit">Submit Order</button> */}
    </form>
  );
}