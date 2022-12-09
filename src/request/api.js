import request from './request'

export const RegisterApi = (params) => request.post('/register', params)

export const LoginApi = (params) => request.post('/login', params)

export const ArticleListApi = (params) => request.get('/article', { params })

export const ArticleAddApi = (params) => request.post('/article/add', params)
//check article
export const ArticleSearchApi = (params) => request.get(`/article/${params.id}`)
//re-edit article
export const ArticleUpdateApi = (params) =>
  request.put('/article/update', params)

export const ArticleDeleteApi = (params) =>
  request.post('/article/remove', params)
//user info
export const GetUserApi = () => request.get('/info')

export const ChangeUserApi = (params) => request.put('/info', params)
