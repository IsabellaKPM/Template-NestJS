FROM node:24-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

FROM base AS development
CMD ["yarn", "start:dev"]

FROM base AS build
RUN yarn build
RUN yarn install --frozen-lockfile --production && yarn cache clean

FROM node:24-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package.json ./

EXPOSE 3001

USER node

CMD ["sh", "-c", "yarn db:migration:run:prod && yarn db:seed:run:prod && if [ -f dist/src/main.js ]; then node dist/src/main.js; else node dist/main.js; fi"]