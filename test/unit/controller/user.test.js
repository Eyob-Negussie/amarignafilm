const user = require('../../../controllers/user');

describe('user.getUsers', () => {
    it('should return all the users',async () => {
        const users = await user.getUsers();
        expect(users).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Eyob'
                })
            ])
        );
    });
});