### Additional developer notes
Name: Andrew R Chen
Date: December 14 2016

Fun project due to working with new tools like Webpack, Babel; took much more time than I had anticipated.
In hindisght I blew way too much time figuring out how to configure the above tools.

At the end I was only able to implement the "C" and the "R" of CRUD in time.

New invoices can be created using a dynamically updating form; correspondingly, the InvoiceItems are also inserted to db.

A future version would have an accordion-style Invoice Entry with dynamically updating elements, re-using the components created for the Create Invoice form. ReactRouter was the target to nav btwn views.


### Direction to Run

```
npm install
npm start
```

should get everything rolling.

....annnnnd I am out of time. :)


------------------------------------------

# Dependencies

- sqlite3
- node
- npm

# Getting Started

###### Install npm dependencies
`npm install`

###### Run the node server
`node app.js`

###### Viewing the application in your browser
`http://localhost:8000`

# Schema

## Customers

- id (integer)
- name (string)
- address (string)
- phone (string)


## Products

- id (integer)
- name (string)
- price (decimal)

## Invoices

- id (integer)
- customer_id (integer)
- discount (decimal)
- total (decimal)

## InvoiceItems

- id (integer)
- invoice_id (integer)
- product_id (integer)
- quantity (decimal)


# Resources

## Customers
```
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}
```

## Products
```
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}
```
## Invoices
```
GET|POST          /api/invoices
GET|PUT|DELETE    /api/invoices/{id}
```

## InvoiceItems
```
GET|POST          /api/invoices/{id}/items
GET|PUT|DELETE    /api/invoices/{invoice_id}/items/{id}
```


