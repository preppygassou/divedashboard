FROM node:20.10.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN  yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]