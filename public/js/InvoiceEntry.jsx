import React from 'react';

class InvoiceEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  openInvoice() {
    console.log('open!');
  }

  render() {
    const {invoice, customer} = this.props;

    return (
      <section className="panel panel-default list-item invoice col-xs-12" onClick={this.openInvoice}>
        <header className="panel-heading row">
          <span className="col-xs-6 text-left">
            {`Invoice ID: ${invoice.id}`}
          </span>
          <span className="col-xs-6 text-right">
            {`for ${customer.name}`}
          </span>
        </header>
        <div className="panel-body row">
          <div className="col-xs-12 col-xs-6">
            <h3>
              <small>
                <span>
                  {`before ${invoice.discount * 100}% discount: `}
                </span>
                <span className="label label-info">
                  ${(invoice.total / (1 - invoice.discount)).toFixed(2)}
                </span>
              </small>
            </h3>
          </div>
          <div className="col-xs-12 col-xs-6 text-right">
            <h3>
              <span>
                {`order total: `}
              </span>
              <span className="label label-warning">
                <strong>${invoice.total}</strong>
              </span>
            </h3>
          </div>
        </div>
      </section>
    );
  }
}

export default InvoiceEntry;