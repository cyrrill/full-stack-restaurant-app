const checkoutRouter = require('./checkout');

it('sums items correctly', () => {

    const items = [
        {price: 1000, quantity: 2},
        {price: 2000, quantity: 3},
        {price: 3000, quantity: 4}
    ];

    const total = checkoutRouter.calculateOrderAmount(items);

    expect(total).toBe(20000);
});