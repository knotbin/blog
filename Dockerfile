FROM denoland/deno:ubuntu

USER root

# Create and set up directory
WORKDIR /app
RUN chown -R deno:deno /app

# Copy files at build time
COPY . /app/

# Ensure Deno user has write permissions
RUN chown -R deno:deno /app

# Run the build step
RUN deno task build

EXPOSE 8000

# Run the application
CMD ["run", "-A", "main.ts"]
