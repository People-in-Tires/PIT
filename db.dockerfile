FROM postgres:16

CMD [ "postgres", "-D", "/var/lib/postgresql/data" ]
