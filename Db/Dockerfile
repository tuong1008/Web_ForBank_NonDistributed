FROM mcr.microsoft.com/mssql/server

# Create a config directory
RUN mkdir -p /usr/config
WORKDIR /usr/config

# Bundle config source
COPY . /usr/config

# Grant permissions for to our scripts to be executable
USER root
RUN chmod +x /usr/config/entrypoint.sh
RUN chmod +x /usr/config/configure-db.sh

EXPOSE 1433

ENTRYPOINT ["./entrypoint.sh"]
