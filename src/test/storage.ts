const storage = {
    getUser: jest.fn(() => ({
      userId: 'test-user-id',
    })),
    setClock: jest.fn(),
  };
  
  export default storage;