import React from 'react';
import { compose } from 'react-komposer';

import 'whatwg-fetch';

import InvoiceEntry from './InvoiceEntry.jsx';
import Modal from './Modal.jsx';

class InvoiceView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {invoices, customers} = this.props;

    return (
      <section className="InvoiceView view-layout col-xs-12">
        <Modal {...this.props} />
        <header className="page-header view-header row">
          <h1 className="col-xs-10">
            <strong>Invoices</strong>
          </h1>
          <div className="col-xs-2">
            <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#Modal">
              New
            </button>
          </div>
        </header>
        <div className="view-body row">
          { invoices.map((invoice, index) =>
              <InvoiceEntry
                  key={index}
                  invoice={invoice}
                  customer={customers.find(entry => invoice.customer_id === entry.id)}
              />
            )
          }
        </div>
      </section>
    );
  }
}

const composer = async ({}, onData) => {
  try {
    const invoice_response = await fetch('/api/invoices');
    const invoice_json = await invoice_response.json();

    const customer_data = await fetch('api/customers');
    const customer_json = await customer_data.json();

    const productData = await fetch('/api/products');
    const product_json = await productData.json();

    onData(
      null,
      {
        invoices: invoice_json,
        customers: customer_json,
        products: product_json,
      }
    );
  }
  catch(error) {
    console.log('ruh-roh. data no load...', error);
  }
}

export default compose(composer)(InvoiceView);