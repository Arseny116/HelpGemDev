ARG RUBY_VERSION=4.0.1
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

WORKDIR /rails

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      curl \
      git \
      libyaml-dev \
      libvips \
      sqlite3 \
      ca-certificates \
      chromium \
      libnss3 \
      libatk-bridge2.0-0 \
      libxcomposite1 \
      libxdamage1 \
      libxfixes3 \
      libxrandr2 \
      libgbm1 \
      libasound2 \
      libpango-1.0-0 \
      libpangocairo-1.0-0 \
      fonts-liberation && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*


RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn @tailwindcss/cli && \
    rm -rf /var/lib/apt/lists/*


COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


COPY . .

RUN yarn build

EXPOSE 4000

CMD ["./bin/dev"]