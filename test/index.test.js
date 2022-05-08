'use strict';

const request = require('supertest');
const express = require('express');
const correlationId = require('../index');

describe('Create new correlation ID', () => {
  test('When use middleware, should add x-correlation-id to incoming request', async () => {
    const app = express();
    app.use(correlationId());
    app.get('/', (req, res) => {
      return res.status(200).json({ id: 'foo' });
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.headers['x-correlation-id']).toBeDefined();
      });
  });

  test('When use custom header, should add custom header to incoming request', async () => {
    const app = express();
    app.use(correlationId({ header: 'x-transaction-id' }));
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

describe('Pass foward correlation ID', () => {
  test('When correlation ID already exist, should add existing ID to incoming request', async () => {
    const app = express();
    app.use(correlationId());
    app.get('/', (req, res) => {
      return res.status(200).json({ id: 'foo' });
    });

    await request(app)
      .get('/')
      .set('x-correlation-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.headers['x-correlation-id']).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });

  test('When custom header ID already exist, should add existing ID to incoming request', async () => {
    const app = express();
    app.use(correlationId({ header: 'x-transaction-id' }));
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
  test('When new correlation ID, should add getId() function to request object', async () => {
    const app = express();
    app.use(correlationId());
    app.get('/', (req, res) => {
      return res.status(200).json({ id: req.getId() });
    });

    await request(app)
      .get('/')
      .expect((res) => {
        expect(res.body.id).toBeDefined();
      });
  });

  test('When correlation ID already exist, should add getId() function to request object', async () => {
    const app = express();
    app.use(correlationId());
    app.get('/', (req, res) => {
      return res.status(200).json({ id: req.getId() });
    });

    await request(app)
      .get('/')
      .set('x-correlation-id', '1c204313-6526-4f36-b32f-a36a410c4ed8')
      .expect((res) => {
        expect(res.body.id).toBe('1c204313-6526-4f36-b32f-a36a410c4ed8');
      });
  });

  test('When new custom header ID, should add getId() function to request object', async () => {
    const app = express();
    app.use(correlationId({ header: 'x-transaction-id' }));
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
    app.use(correlationId({ header: 'x-transaction-id' }));
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
