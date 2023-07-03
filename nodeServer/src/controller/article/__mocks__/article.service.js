const articleService = jest.mock("./article.service");

let mockData;

articleService.create = jest.fn((article) => {
  const newArticle = {
    ...article,
    id: mockData[mockData.length - 1].id + 1,
  };
  mockData.push(newArticle);
  return Promise.resolve(newArticle);
});

articleService.findAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

articleService.findById = jest.fn((id) => {
  const articleToGet = mockData.find((article) => article.id === id);
  return Promise.resolve(articleToGet);
});

articleService.update = jest.fn((id, articleData) => {
  let articleToUpdate = mockData.find((article) => {
    article.id === id;
  });
  articleToUpdate = articleData;
  return Promise.resolve(articleToUpdate);
});

articleService.delete = jest.fn((id) => {
  const articleIndex = mockData.findIndex((article) => article.id === id);
  if (articleIndex === -1) {
    return Promise.resolve(null);
  }
  const [deletedArticle] = mockData.splice(articleIndex, 1);
  return Promise.resolve({});
});

articleService.__setMockData = (data) => {
  mockData = data;
};

module.exports = articleService;
