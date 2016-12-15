import React from 'react';

const CustomerSelectInput = ({customers, selectedCustomer, onChangeHandler}) => {
  return (
    <div className="form-group">
      <label>
        Customer:
      </label>
      <select className="form-control" value={selectedCustomer} onChange={onChangeHandler}>
        <option selected value="default">
          Select Customer
        </option>
        {
          customers.map((entry, index) =>
            <option key={entry.id} value={entry.name}>
              {entry.name}
            </option>
          )
        }
      </select>
    </div>
  );
};

export default CustomerSelectInput;