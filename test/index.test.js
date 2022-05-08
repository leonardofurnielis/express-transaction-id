'use strict';

const request = require('supertest');
const express = require('express');
const transactionId = require('../index');

describe('Create new transaction ID', () => {
  test('When use middleware, should add x-transaction-id to incoming request', async () => {
    const app = express();
    app.use(transactionId());
    app.get('/', (req, res) => {
      return res.status(200).json({ id: 'foo' });
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.headers['x-transaction-id']).toBeDefined();
      });
  });

  test('When use custom header, should add custom header to incoming request', async () => {
    const app = express();
    app.use(transactionId({ custom_header: 'x-transaction-id' }));
    app.get('/', (req, res) => {
      return res.status(200).json({ id: 'foo' });
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.headers['x-transaction-id']).toBeDefined();
      });
  });
});

describe('Pass foward transaction ID', () => {
  test('When transaction ID already exist, should add existing ID to incoming request', async () => {
    const app = express();
    app.use(transactionId());
    app.get('/', (req, res) => {
      return res.status(200).json({ id: 'foo' });
    });

    await request(app)
      .get('/')
      .set('x-transaction-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.headers['x-transaction-id']).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });

  test('When custom header ID already exist, should add existing ID to incoming request', async () => {
    const app = express();
    app.use(transactionId({ custom_header: 'x-transaction-id' }));
    app.get('/', (req, res) => {
      return res.status(200).json({ id: 'foo' });
    });

    await request(app)
      .get('/')
      .set('x-transaction-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.headers['x-transaction-id']).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });
});

describe('getId()', () => {
  test('When new transaction ID, should add getId() function to request object', async () => {
    const app = express();
    app.use(transactionId());
    app.get('/', (req, res) => {
      return res.status(200).json({ id: req.getId() });
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.body.id).toBeDefined();
      });
  });

  test('When transaction ID already exist, should add getId() function to request object', async () => {
    const app = express();
    app.use(transactionId());
    app.get('/', (req, res) => {
      return res.status(200).json({ id: req.getId() });
    });

    await request(app)
      .get('/')
      .set('x-transaction-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.body.id).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });

  test('When new custom header ID, should add getId() function to request object', async () => {
    const app = express();
    app.use(transactionId({ custom_header: 'x-transaction-id' }));
    app.get('/', (req, res) => {
      return res.status(200).json({ id: req.getId() });
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.body.id).toBeDefined();
      });
  });

  test('When custom header ID already exist, should add getId() function to request object', async () => {
    const app = express();
    app.use(transactionId({ custom_header: 'x-transaction-id' }));
    app.get('/', (req, res) => {
      return res.status(200).json({ id: req.getId() });
    });

    await request(app)
      .get('/')
      .set('x-transaction-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.body.id).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });
});
