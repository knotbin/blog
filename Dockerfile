FROM denoland/deno:ubuntu

USER root

WORKDIR /deno-dir/
RUN chown -R deno:deno /deno-dir

COPY . .
RUN deno cache main.ts
RUN deno task build

EXPOSE 8000

CMD ["run", "-A", "--allow-all", "main.ts"]
