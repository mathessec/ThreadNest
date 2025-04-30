const ApiRoutes = {
  LOGIN: {
    path: '/user/login',
    authenticate: false,
  },
  SIGNUP: {
    path: '/user/createUser',
    authenticate: false,
  },
  CREATE_TAILOR: {
    path: '/tailor/create',
    authenticate: true,
  },
  GET_ALL_TAILORS: {
    path: '/tailor/getall',
    authenticate: true,
  },
  GET_TAILOR_BY_ID: {
    path: (id) => `/tailor/getbyid/${id}`,
    authenticate: true,
  },
  EDIT_TAILOR: {
    path: (id) => `/tailor/edit/${id}`,
    authenticate: true,
  },
  DELETE_TAILOR: {
    path: (id) => `/tailor/delete/${id}`,
    authenticate: true,
  }
  
};

export default ApiRoutes;
