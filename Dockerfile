FROM denoland/deno:ubuntu

WORKDIR /deno-dir/
RUN chown -R deno:deno /deno-dir

COPY . .
RUN deno cache main.ts
RUN deno task build

USER deno
EXPOSE 8000

CMD ["run", "-A", "--allow-all", "main.ts"]
