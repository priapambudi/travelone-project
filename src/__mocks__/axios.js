// __mocks__/axios.js

const axios = {
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: [
          {
            id: 1,
            imageUrl: "https://example.com/image.jpg",
          },
        ],
      },
    })
  ),
};

export default axios;
