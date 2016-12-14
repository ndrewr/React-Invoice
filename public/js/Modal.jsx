import React from 'react';
import { compose } from 'react-komposer';

import 'whatwg-fetch';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      selectedCustomer: '',
      selectedProducts: [],
    }

    this.changeCustomer = this.changeCustomer.bind(this);
    this.createInvoice = this.createInvoice.bind(this);
    this.updateProductList = this.updateProductList.bind(this);
    this.filteredList = this.filteredList.bind(this);
  }

  updateProductList(event) {
    if (event.target.value !== "default") {
      const updatedList = this.state.selectedProducts.concat([{id: parseInt(event.target.value, "10")}]);
      console.log('product added! updated list is: ', updatedList);
      this.setState({
        selectedProducts: updatedList,
      });
    }
  }

  filteredList() {
    const selectedProductIds = this.state.selectedProducts.map(item => item.id);
    return this.props.products.filter(product => ! selectedProductIds.includes(product.id));
  }

  changeCustomer(event) {
    console.log('customer changed!');
    this.setState({selectedCustomer: event.target.value});
  }

  createInvoice(event) {
    event.preventDefault();

    // TODO: must crudely validate
    console.log('....boom. created. Here is the state: ', this.state);
  }

  render() {
    const {customers, products} = this.props;

    const CustomerSelectInput = ({customers, selectedCustomer, onChangeHandler}) => {
      return (
        <div className="form-group">
          <label>
            Customer:
          </label>
          <select className="form-control" value={selectedCustomer} onChange={onChangeHandler}>
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

    const ProductList = ({products, selectedProducts, onChangeHandler}) => {
      const selectedProductIds = selectedProducts.map(item => item.id);
      const filteredList = products.filter(product => {
        console.log('for product id ', product.id, ' we have... ', selectedProductIds.includes(product.id));
        return ! selectedProductIds.includes(product.id);
      });

      console.log('selected product ids are: ', selectedProductIds);
      console.table(products)
      console.log('product list refresh...', filteredList);

      return (
        <div className="form-group">
          <select className="form-control" value="Choose product" onChange={onChangeHandler}>
            <option selected value="default">
              Choose Product
            </option>
            {
              filteredList.map((entry, index) =>
                <option key={entry.id} value={entry.id}>
                  {entry.name}
                </option>
              )
            }
          </select>
        </div>
      );
    };



    return (
      <div className="modal fade" id="Modal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={this.createInvoice}>
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="ModalLabel">
                  Create New Invoice
                </h4>
              </div>
              <div className="modal-body">
                <CustomerSelectInput customers={customers} selectedCustomer={this.state.selectedCustomer} onChangeHandler={this.changeCustomer} />
                <ProductList products={this.props.products} selectedProducts={this.state.selectedProducts} onChangeHandler={this.updateProductList} />
              </div>
              <div className="modal-footer">
                <div className="">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Create this invoice!</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const composer = async (props, onData) => {
  console.log('modal updating...', props);

  onData(
    null,
    props,
  );
}

export default compose(composer)(Modal);