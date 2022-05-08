/*
 * node-correlation-id
 * Copyright 2022 Leonardo Furnielis.
 * Licensed under MIT License
 */

'use strcit';

const uuid = require('uuid');

/**
 * Express unique identifier value that is attached to requests.
 * @param {Object} [options]
 * @param {Boolean} options.header - Configure the name header to be attached in requests.
 * @return {VoidFunction}
 */
module.exports = (options = {}) => {
  const correlationId = options.header || 'x-correlation-id';

  return (req, res, next) => {
    const getId = (id) => {
      return () => {
        return id;
      };
    };

    if (
      !req.headers[correlationId] ||
      (req.headers[correlationId] && req.headers[correlationId].trim() === '')
    ) {
      const id = uuid.v1();
      res.setHeader(correlationId, id);
      req.getId = getId(id);
      next();
    } else {
      res.setHeader(correlationId, req.headers[correlationId]);
      req.getId = getId(req.headers[correlationId]);
      next();
    }
  };
};
