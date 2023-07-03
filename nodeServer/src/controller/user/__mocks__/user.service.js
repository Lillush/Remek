const userService = jest.mock("./user.service");

let mockData;

userService.create = jest.fn((user) => {
  const newUser = {
    ...user,
    id: mockData[mockData.length - 1].id + 1,
  };
  mockData.push(newUser);
  return Promise.resolve(newUser);
});

userService.findAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

userService.findById = jest.fn((id) => {
  const userToGet = mockData.find((user) => user.id === id);
  return Promise.resolve(userToGet);
});

userService.update = jest.fn((id, userData) => {
  let userToUpdate = mockData.find((user) => {
    user.id === id;
  });
  userToUpdate = userData;
  return Promise.resolve(userToUpdate);
});

userService.delete = jest.fn((id) => {
  const userIndex = mockData.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return Promise.resolve(null);
  }
  const [deletedUser] = mockData.splice(userIndex, 1);
  return Promise.resolve({});
});

userService.__setMockData = (data) => {
  mockData = data;
};

module.exports = userService;
