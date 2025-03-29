FROM denoland/deno:ubuntu

WORKDIR /app

COPY . .
RUN deno cache main.ts
RUN mkdir -p node_modules/.deno/node_modules && chmod -R 777 node_modules/.deno/node_modules
RUN deno task build

USER deno
EXPOSE 8000

CMD ["run", "-A", "main.ts"]
