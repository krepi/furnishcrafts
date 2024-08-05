/**
 * Middleware to validate allowed query parameters.
 * @param {string[]} allowedParams - Array of allowed parameter names.
 * @returns {function} Middleware to use in Express routes.
 */
const validateQueryParams = (allowedParams) => (req, res, next) => {
    const queryKeys = Object.keys(req.query);

    for (const key of queryKeys) {
        if (!allowedParams.includes(key)) {
            return res.status(400).json({ message: `Invalid query parameter: ${key}` });
        }
    }

    next();
};

/**
 * Middleware to ensure no unexpected query parameters are passed.
 * @returns {function} Middleware to use in Express routes.
 */
const validateEmptyQueryParams = (req, res, next) => {
    const queryKeys = Object.keys(req.query);

    if (queryKeys.length > 0) {
        return res.status(400).json({ message: `Unexpected query parameters: ${queryKeys.join(', ')}` });
    }

    next();
};

export { validateQueryParams, validateEmptyQueryParams };

