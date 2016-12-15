import React from 'react';
import { compose } from 'react-komposer';

import 'whatwg-fetch';

import ComputedTotal from './ComputedTotal.jsx';
import CustomerSelectInput from './CustomerSelectInput.jsx';
import ProductList from './ProductList.jsx';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      selectedCustomer: '',
      selectedProducts: [],
      discount: 0,
      total: 0,
    }

    this.changeCustomer = this.changeCustomer.bind(this);
    this.createInvoice = this.createInvoice.bind(this);
    this.updateProductList = this.updateProductList.bind(this);
    this.updateProductQuantity = this.updateProductQuantity.bind(this);
    this.updateDiscount = this.updateDiscount.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.filteredList = this.filteredList.bind(this);
  }

  updateProductList(event) {
    const element = event.target;
    if (element.value !== "default") {
      const targetId = parseInt(element.value, "10");
      const addedProduct = Object.assign({}, this.props.products.find(product => targetId === product.id), {quantity: 1});

      const updatedList = this.state.selectedProducts.concat([addedProduct]);
      this.setState({
        selectedProducts: updatedList,
      },
        this.updateTotal,
      );
    }
  }

  updateProductQuantity(product) {
    return (event) => {
      const newQuantity = parseInt(event.target.value, "10");
      const filteredList = this.state.selectedProducts.filter(entry => entry.id !== product.id);
      const updatedList = filteredList.concat([Object.assign({}, product, {quantity: newQuantity})]);

      this.setState({'selectedProducts': updatedList}, this.updateTotal);
    }
  }

  updateTotal() {
    const enteredDiscount = this.state.discount;
    const unadjustedTotal = this.state.selectedProducts
                                              .reduce((runningTotal, entry) => runningTotal + (entry.price * entry.quantity), 0);
    const finalTotal = unadjustedTotal * ((1 - enteredDiscount));

    this.setState({total: finalTotal ? finalTotal.toFixed(2) : 0});
  }

  updateDiscount(event) {
    const enteredDiscount = parseInt(event.target.value, '10') / 100;

    this.setState({discount: enteredDiscount}, this.updateTotal);
    event.target.focus();
  }

  filteredList() {
    const selectedProductIds = this.state.selectedProducts.map(item => item.id);
    return this.props.products.filter(product => ! selectedProductIds.includes(product.id));
  }

  changeCustomer(event) {
    this.setState({selectedCustomer: event.target.value});
  }

  createInvoice(event) {
    event.preventDefault();

    const {discount, total, selectedCustomer, selectedProducts} = this.state;
    const {customers} = this.props;

    // TODO: must crudely validate
    if (selectedCustomer) {
      const invoiceData = {
        customer_id: customers.find(entry => entry.name === selectedCustomer).id,
        discount: discount,
        total: total,
      }

      const resp = fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceData),
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // insert invoice items
        const newInvoiceId = data.id;

        selectedProducts.map(entry => {
          const itemData = {
            invoice_id: newInvoiceId,
            product_id: entry.id,
            quantity: entry.quantity,
          };

          fetch(`/api/invoices/${newInvoiceId}/items`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData),
          })
          .then(response => {
            console.log(response);
          });
        })

      })
      .catch(error => console.log('create invoice failed: ', error));
    }

    $('#Modal').modal('hide')
  }

  render() {
    const {customers, products} = this.props;

    return (
      <div className="modal fade" id="Modal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="ModalLabel">
                  Create New Invoice
                </h4>
              </div>
              <div className="modal-body">
                <form id="invoiceForm" onSubmit={this.createInvoice}>
                  <CustomerSelectInput
                    customers={customers} selectedCustomer={this.state.selectedCustomer} onChangeHandler={this.changeCustomer} />
                  <ProductList
                    products={this.props.products} selectedProducts={this.state.selectedProducts}
                    onProductSelect={this.updateProductList} updateQuantity={this.updateProductQuantity} />
                  <ComputedTotal currentDiscount={this.state.discount} currentTotal={this.state.total} updateDiscount={this.updateDiscount} />
                </form>
              </div>
              <div className="modal-footer">
                <div className="">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="submit" form="invoiceForm" className="btn btn-primary">Create this invoice!</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

const composer = async (props, onData) => {
  onData(
    null,
    props,
  );
}

export default compose(composer)(Modal);