//Counter.jsx
import React, { useState } from 'react';

function Counter() {
    let [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return(
        <div style={{textAlign: 'center'}}>
            <h3>Counter App</h3>
            <div>
                <button variant="contained" onClick={increment}>+</button>
                <span> {count} </span>
                <button variant="contained" onClick={decrement}>-</button>
            </div>
        </div>
    );
};

export default Counter;