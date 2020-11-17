# nuxt-ssr-auth-skeleton

I built this skeleton in frustration of poor server-side rendering support of `nuxt-auth` module.

This skeleton project communicates directly with `/api` for authentication (and other stuff).

You can safely either wrap your external API in `/api` directory, either use it directly.

The API part is written using `express` and leverages `express-session` to persist user session across page reload.

It's not production-ready, it's more like a demo project, so you can tinker it further as you please.

## What it includes
- `typescript` with proper typings
- `bootstrap-vue` (i was lazy to write pure HTML...)
- `@nuxtjs/toast` for toast notifications
- `@nuxtjs/axios` for API calls
- `nuxt-session` to sync `express-session` with nuxt's ssr engine (it only do `unshift` on `express` app with `express-session`...)
- `morgan` for express logging

## Credentials
I've created an `/app/mock/user.mock.ts` file that contains a collection of mocked users.
You can use `test1@test.com` as email address. That's the only thing checked in `/api/auth/login` endpoint.

## NOTE:
- some dependencies (such as express & others) were added in `dependencies` bcs nuxt builder didn't look after `devDependencies` at all.
- i don't really like how you merge app session data with express-session typing system. looks weird...

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
