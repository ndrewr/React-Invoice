import 'whatwg-fetch';

const printData = async () => {
  const data = await fetch('/api/products');
  const json_data = await data.json();

  console.table(json_data);

  const more_data = await fetch('api/customers');
  const customer_data = await more_data.json();

  console.table(customer_data);

  const mo_data = await fetch('api/invoices');
  const invoice_data = await mo_data.json();

  console.table(invoice_data);
};

export {printData};