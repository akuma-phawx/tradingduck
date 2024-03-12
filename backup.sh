# This script connects to the postgres db in docker, does a pg_dump into a mounted directory and then uploads it with megacmd
# It is meant to be run as a cron job

# Get the current date
DATE=$(date +%Y-%m-%d)

# Connect to the postgres db in docker and dump it into a mounted directory
docker exec -t postgres-service pg_dumpall -c -U postgres > /backup/postgres-$DATE.sql

# Upload the dump to mega.nz
mega-put /backup/postgres-$DATE.sql /Root/Backups/Postgres/ -c

# Delete the dump
rm /backup/postgres-$DATE.sql
