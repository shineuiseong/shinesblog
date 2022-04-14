FROM node:14.17.4

RUN mkdir /app
# work directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --no-cache

# 서버 소스 복사
COPY . /app

# 실행 명령어
CMD ["npm", "run","dev"]
