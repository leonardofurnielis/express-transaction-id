# express-transaction-id

![npm](https://img.shields.io/npm/v/express-transaction-id)
![workflow](https://github.com/leonardofurnielis/express-transaction-id/actions/workflows/test-coverage.yml/badge.svg)
[![codecov](https://codecov.io/gh/leonardofurnielis/express-transaction-id/branch/master/graph/badge.svg)](https://codecov.io/gh/leonardofurnielis/express-transaction-id)
![GitHub](https://img.shields.io/github/license/leonardofurnielis/express-transaction-id.svg)
![npm](https://img.shields.io/npm/dm/express-transaction-id.svg)

## Installation 


```bash
$ npm install express-transaction-id --save
```

## Use

In an [express](https://www.npmjs.com/package/express) based application:

```js

const  express = require('express');
const  transactionId = require('express-transaction-id');
  
const  app = express();

app.use(transactionId({ header: 'x-global-transaction-id' }));
// Setup your routes
app.get('/foo', (req, res, next) => {

   return res.status(200).json({ transaction_id: req.getId() });
});

```

## Options

| Option | Type | Default | Description  |
| ------ |------|---------| ------------ |
| header | String | `x-transaction-id`| The name of the inbound header to check for a transaction id. |

## License

[MIT](LICENSE)
