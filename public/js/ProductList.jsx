import React from 'react';

const ProductList = ({products, selectedProducts, onProductSelect, updateQuantity}) => {
  const selectedProductIds = selectedProducts.map(item => item.id);
  const filteredList = products.filter(product => {
    return ! selectedProductIds.includes(product.id);
  });

  return (
    <div className="ProductList form-group">
      <select className="form-control product-select" value="Choose product" onChange={onProductSelect}>
        <option selected value="default">
          Add Products
        </option>
        {
          filteredList.map((entry, index) =>
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          )
        }
      </select>
      <div className="selected-products">
        <hr />
        <h4>Selected Products</h4>
        <ul className="list-group row">
          {
            selectedProducts.map((entry, index) =>
              <li className="list-group-item produc-list-item col-xs-12" key={entry.id}>
                <div className="row">
                  <span className="col-xs-5">
                    {entry.name}
                  </span>
                  <span className="product-list-item-controls pull-right text-right col-xs-7">
                    <span className="col-xs-5">
                      ${entry.price}/unit
                    </span>
                    <span className="col-xs-7">
                        <span className="">
                          quantity&nbsp;
                        </span>
                        <input type="number" className="text-right" aria-label="Item quantity"
                              value={entry.quantity} onChange={updateQuantity(entry)} />
                    </span>
                  </span>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default ProductList;