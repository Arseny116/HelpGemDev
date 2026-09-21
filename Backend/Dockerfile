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





COPY Gemfile Gemfile.lock ./
RUN bundle install


COPY . .

EXPOSE 4000

CMD ["./bin/dev"]