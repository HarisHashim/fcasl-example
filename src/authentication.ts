// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'
import { oauth, OAuthStrategy } from '@feathersjs/authentication-oauth'

import type { Application } from './declarations'

import { defineAbilitiesFor } from './services/users/abilities' 

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)

  const servicePath =   'authentication'

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('google', new OAuthStrategy())
  authentication.register('auth0', new OAuthStrategy())

  app.use(servicePath, authentication)

  console.log('Setting up Authentication service hook')
  app.service(servicePath).hooks({
    after: {create:[
   (context) => {
        const { user } = context.result;
        if (!user) return context;
        const ability = defineAbilitiesFor(user);
        context.result.ability = ability;
        context.result.rules = ability.rules;

        return context;
      }
    ]}
  })

  app.configure(oauth())
}
