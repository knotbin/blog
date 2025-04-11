FROM denoland/deno:latest

WORKDIR /deno-dir/

COPY . .
RUN deno cache main.ts
RUN deno task build

USER deno
EXPOSE 8000

CMD ["run", "-A", "--allow-all", "main.ts"]
