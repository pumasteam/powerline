FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock /app
RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]