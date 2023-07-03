const streamService = jest.mock("./stream.service");

let mockData;

streamService.create = jest.fn((stream) => {
  const newStream = {
    ...stream,
    id: mockData[mockData.length - 1].id + 1,
  };
  mockData.push(newStream);
  return Promise.resolve(newStream);
});

streamService.findAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

streamService.findById = jest.fn((id) => {
  const streamToGet = mockData.find((stream) => stream.id === id);
  return Promise.resolve(streamToGet);
});

streamService.update = jest.fn((id, streamData) => {
  let streamToUpdate = mockData.find((stream) => {
    stream.id === id;
  });
  streamToUpdate = streamData;
  return Promise.resolve(streamToUpdate);
});

streamService.delete = jest.fn((id) => {
  const streamIndex = mockData.findIndex((stream) => stream.id === id);
  if (streamIndex === -1) {
    return Promise.resolve(null);
  }
  const [deletedStream] = mockData.splice(streamIndex, 1);
  return Promise.resolve({});
});

streamService.__setMockData = (data) => {
  mockData = data;
};

module.exports = streamService;
