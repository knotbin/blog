FROM denoland/deno:ubuntu

WORKDIR /app

COPY . .
RUN deno cache main.ts
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN mkdir -p node_modules/.deno && chmod -R 778 node_modules/.deno
RUN mkdir -p node_modules/.deno && chmod -R 779 node_modules/.deno
RUN deno task build

USER deno
EXPOSE 8000

CMD ["run", "-A", "main.ts"]
