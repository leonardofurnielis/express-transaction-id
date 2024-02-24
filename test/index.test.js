'use strict';

const request = require('supertest');
const express = require('express');
const transactionId = require('../index');

describe('Create new `id` to incoming request', () => {
  test('It should add x-transaction-id header to incoming request', async () => {
    const app = express();
    app.use(transactionId());
    app.get('/', (req, res) => {
      return res.status(201).json({});
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.headers['x-transaction-id']).toBeDefined();
      });
  });

  test('It should add custom header to incoming request', async () => {
    const app = express();
    app.use(transactionId({ custom_header: 'x-global-transaction-id' }));
    app.get('/', (req, res) => {
      return res.status(201).json({});
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.headers['x-global-transaction-id']).toBeDefined();
      });
  });
});

describe('Foward `transaction-id`', () => {
  test('When `transaction-id` already exist, it should add to incoming request', async () => {
    const app = express();
    app.use(transactionId());
    app.get('/', (req, res) => {
      return res.status(201).json({});
    });

    await request(app)
      .get('/')
      .set('x-transaction-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.headers['x-transaction-id']).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });

  test('When custom header id already exist, it should add existing `id` to incoming request', async () => {
    const app = express();
    app.use(transactionId({ custom_header: 'x-global-transaction-id' }));
    app.get('/', (req, res) => {
      return res.status(201).json({});
    });

    await request(app)
      .get('/')
      .set('x-global-transaction-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.headers['x-global-transaction-id']).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });
});

describe('getId()', () => {
  test('It should add getId() function to request object', async () => {
    const app = express();
    app.use(transactionId());
    app.get('/', (req, res) => {
      return res.status(201).json({ transaction_id: req.getId() });
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.body.transaction_id).toBeDefined();
      });
  });

  test('When `transaction-id` already exist, it should add getId() function to request object', async () => {
    const app = express();
    app.use(transactionId());
    app.get('/', (req, res) => {
      return res.status(200).json({ transaction_id: req.getId() });
    });

    await request(app)
      .get('/')
      .set('x-transaction-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.body.transaction_id).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });

  test('When custom header `id`, it should add getId() function to request object', async () => {
    const app = express();
    app.use(transactionId({ custom_header: 'x-global-transaction-id' }));
    app.get('/', (req, res) => {
      return res.status(200).json({ transaction_id: req.getId() });
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.body.transaction_id).toBeDefined();
      });
  });

  test('When custom header `id` already exist, it should add getId() function to request object', async () => {
    const app = express();
    app.use(transactionId({ custom_header: 'x-global-transaction-id' }));
    app.get('/', (req, res) => {
      return res.status(200).json({ transaction_id: req.getId() });
    });

    await request(app)
      .get('/')
      .set('x-global-transaction-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.body.transaction_id).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });
});
