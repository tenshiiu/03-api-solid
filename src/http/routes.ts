import { FastifyInstance } from 'fastify'

import { register } from './controllers/register'
import { profile } from './controllers/profile';
import { authenticate } from './controllers/authenticate';
import { verifyJWT } from './middlewares/verify-jwt';

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/session', authenticate)

    app.get('/me', { onRequest: [verifyJWT]},profile)
}