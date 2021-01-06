FROM node:alpine

LABEL version="1.1.0"
LABEL description="A notes taking app with built-in versionning"

WORKDIR /app

EXPOSE 8080

# Dependencies optimization
COPY package.json yarn.lock ./
RUN yarn

# Copy all code
COPY . .

# Compile Next.js to production build for better performances
RUN yarn build

ENV NODE_ENV=production
ENV PORT=8080

# Actual server bootstrap
CMD ["node", "api/"]
