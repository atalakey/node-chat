const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      { id: '1', name: 'User 1', room: 'Room 1' },
      { id: '2', name: 'User 2', room: 'Room 2' },
      { id: '3', name: 'User 3', room: 'Room 1' }
    ];
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'John',
      room: 'Some room name'
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });
  
  it('should remove a user', () => {
    const userId = users.users[0].id;
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    const userId = '99';
    const user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const userId = users.users[0].id;
    const user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    const userId = '99';
    const user = users.getUser(userId);

    expect(user).toBeFalsy();
  });

  it('should return names for room 1', () => {
    const userList = users.getUserList('Room 1')

    expect(userList).toEqual(['User 1', 'User 3']);
  });

  it('should return names for room 2', () => {
    const userList = users.getUserList('Room 2')

    expect(userList).toEqual(['User 2']);
  });
});
