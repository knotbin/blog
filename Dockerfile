FROM denoland/deno:ubuntu

USER root

WORKDIR /deno-dir/
RUN chown -R deno:deno /deno-dir

# We don't copy files here anymore - they will be copied at runtime
# from the read-only mounted volume

# Cache dependencies
RUN mkdir -p /src
COPY deno.json /src/
WORKDIR /src
RUN deno cache -r deno.json

# Switch back to deno-dir (our actual runtime directory)
WORKDIR /deno-dir/

EXPOSE 8000

# Command is now handled by docker-compose entrypoint
