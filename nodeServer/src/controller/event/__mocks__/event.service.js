const eventService = jest.mock("./event.service");

let mockData;

eventService.create = jest.fn((event) => {
  const newEvent = {
    ...event,
    id: mockData[mockData.length - 1].id + 1,
  };
  mockData.push(newEvent);
  return Promise.resolve(newEvent);
});

eventService.findAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

eventService.findById = jest.fn((id) => {
  const eventToGet = mockData.find((event) => event.id === id);
  return Promise.resolve(eventToGet);
});

eventService.update = jest.fn((id, eventData) => {
  let eventToUpdate = mockData.find((event) => {
    event.id === id;
  });
  eventToUpdate = eventData;
  return Promise.resolve(eventToUpdate);
});

eventService.delete = jest.fn((id) => {
  const eventIndex = mockData.findIndex((event) => event.id === id);
  if (eventIndex === -1) {
    return Promise.resolve(null);
  }
  const [deletedEvent] = mockData.splice(eventIndex, 1);
  return Promise.resolve({});
});

eventService.__setMockData = (data) => {
  mockData = data;
};

module.exports = eventService;
