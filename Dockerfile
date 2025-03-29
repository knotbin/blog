FROM denoland/deno:ubuntu

WORKDIR /app

COPY . .
RUN deno cache main.ts
RUN deno task build

USER deno
EXPOSE 8000

CMD ["run", "-A", "main.ts"]
