FROM node:20



WORKDIR /usr/src/nest-backend

COPY  . .


RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]