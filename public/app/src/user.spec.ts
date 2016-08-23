import { User } from '../../app/models/user';
describe('User', () => {
    it('has username', () => {
        let user: User = { username: 'marco', password: 'open' };
        expect(user.username).toEqual('marco');
    });
});
