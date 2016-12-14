import React from 'react';
import { compose } from 'react-komposer';

import 'whatwg-fetch';

class ProductView extends React.Component {
  render() {
    const {products} = this.props;

    const ProductEntry = ({product}) => {
      return (
        <section className="panel panel-default list-item product-item col-xs-12">
          <header className="panel-heading">
            {product.name}
          </header>
          <div className="panel-body row">
            <div className="col-xs-12 col-xs-6">
              {product.id}
            </div>
            <div className="col-xs-12 col-xs-6">
              {product.price}
            </div>
          </div>
        </section>
      );
    };

    return (
      <section className="ProductView view-layout col-xs-12">
        <header className="page-header view-header row">
          <h1 className="col-xs-10">
            <strong>Products</strong>
          </h1>
          <div className="col-xs-2">
            <button type="button" className="btn btn-warning btn-lg" data-toggle="modal" data-target="#Modal">
              New
            </button>
          </div>
        </header>
        <div className="view-body row">
          { products.map((product, index) => {
              return <ProductEntry key={index} product={product} />
            })
          }
        </div>
      </section>
    );
  }
}

const composer = async ({}, onData) => {
  // let data = fetch('/api/products')
  //         .then((response) => response.json())
  //         .then((data) =>  {
  //           console.log(data);
  //           onData(null, {products: data});
  //         })
  //         .catch((error) => console.log('ruhroh: ', error));
  try {
    const data = await fetch('/api/products');
    const json_data = await data.json();

    console.table(json_data);

    const more_data = await fetch('api/customers');
    const customer_data = await more_data.json();

    console.table(customer_data);

    const mo_data = await fetch('api/invoices');
    const invoice_data = await mo_data.json();

    console.table(invoice_data);

    onData(
      null,
      {
        products: json_data,
      }
    );
  }
  catch(error) {
    console.log('ruh-roh. data no load...', error);
  }

}

export default compose(composer)(ProductView);