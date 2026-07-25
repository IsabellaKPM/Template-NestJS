FROM node:24-alpine AS base

RUN corepack enable && corepack prepare yarn@4.17.0 --activate

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --immutable
COPY . .

FROM base AS development
CMD ["yarn", "start:dev"]

FROM base AS build
RUN yarn build
RUN yarn install --immutable --production && yarn cache clean

FROM node:24-alpine AS production

RUN corepack enable && corepack prepare yarn@4.17.0 --activate

WORKDIR /app
ENV NODE_ENV=production

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package.json ./

EXPOSE 3001
USER node
CMD ["sh", "-c", "yarn db:migration:run:prod && yarn db:seed:run:prod && if [ -f dist/src/main.js ]; then node dist/src/main.js; else node dist/main.js; fi"]