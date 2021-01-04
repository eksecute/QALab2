const { ExceptionManager } = require('./lab1');
const { sendMessage } = require('./sendMessage');
const { ValidationError, PermissionError, DatabaseError } = require('./modules/errors');

// jest.mock('./sendMessage')

const exceptionManager = new ExceptionManager;

const critErrors = [ new ValidationError(), new PermissionError(), new DatabaseError() ];
const ordErrors = [ new SyntaxError(), new Error(), new TypeError(), new RangeError() ];

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ res: false }),
    })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('Critical errors', () => {
  critErrors.forEach(elm => {
    test(`exceptionManager CRITICAL counter for '${elm}' should increment, and should NOT increment for ORDINARY counter`, () => {
      const oldCritCounter = exceptionManager.crit;
      const oldOrdCounter = exceptionManager.ordinary;

      exceptionManager.handlingError(elm);
      const newCritCounter = exceptionManager.crit;
      const newOrdCounter = exceptionManager.ordinary;

      expect(newCritCounter).not.toBe(oldCritCounter);
      expect(newOrdCounter).toBe(oldOrdCounter);
    });
  });
});

describe('Ordinary errors', () => {
  ordErrors.forEach(elm => {
    test(`ORDINARY counter for '${elm}' should increment, and should NOT increment for CRITICAL counter`, () => {
      const oldCritCounter = exceptionManager.crit;
      const oldOrdCounter = exceptionManager.ordinary;
      exceptionManager.handlingError(elm);
      const newCritCounter = exceptionManager.crit;
      const newOrdCounter = exceptionManager.ordinary;

      expect(newCritCounter).toEqual(oldCritCounter);
      expect(newOrdCounter).toBeGreaterThan(oldOrdCounter);
    });
  });
});

describe('Sending errors', () => {
  test('should return true', () => {
    sendMessage().then(res => {
      expect(res).toBe(false);
    })
  })
});
