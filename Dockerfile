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
      ca-certificates && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    npm install -g @tailwindcss/cli && \
    rm -rf /var/lib/apt/lists/*



COPY Gemfile Gemfile.lock ./
RUN bundle install


COPY package.json yarn.lock ./
RUN yarn install


COPY . .

RUN yarn build

EXPOSE 4000

CMD ["./bin/dev"]