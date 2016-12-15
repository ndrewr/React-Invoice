import React from 'react';

const ComputedTotal = ({currentDiscount, currentTotal, updateDiscount}) => {
  return (
    <div className="ComputedTotal row">
      <div className="col-xs-6">
        <label>
          discount %:&nbsp;
        </label>
          <input
            type="number" className="total-input text-right" aria-label="Item discount" value={currentDiscount * 100}
            onChange={updateDiscount} />
      </div>
      <div className="col-xs-6 text-right">
        <h2>
        <label>
          TOTAL:&nbsp;
        </label>
        <span>
          {currentTotal}
        </span>
        </h2>
      </div>
    </div>
  );
};

export default ComputedTotal;