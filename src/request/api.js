import request from './request'

export const RegisterApi = (params) => request.post('/register', params)

export const LoginApi = (params) => request.post('/login', params)

export const ArticleListApi = (params) => request.get('/article', { params })
