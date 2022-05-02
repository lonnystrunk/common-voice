# Running on Digital Ocean droplet

Reminders of useful commands.

Feel free to add to this document, especially for dev workflow etc.

## Building the app on the droplet

When hot reload is deactivated we need to build the frontend explicitly.

```
$ yarn import-locales # will update the jsons in `locales` folder automatically
$ cd server && yarn build # will build server
$ cd web && yarn build # idem for frontend, might take a minute
```

## Starting/tearing down docker

Note the difference between `down` and `stop`. We need to find a way to save the database outside of docker as well.

```
$ docker-compose up -d # will run in detached mode, building containers from scratch
$ docker-compose start # if containers exist already, just start them
$ docker-compose stop # just stop the containers, do not delete anything
$ docker-compose down # clean up everything, warning database will be gone!
```

## Checking contents of MySQL database

```
$ docker exec -it db bash
$ mysql -u voicecommons -p
> SHOW DATABASES;
> USE voiceweb;
> SHOW TABLES;
> SELECT * from clips;
```

# Getting recording data from MySQL database

## On Droplet - ssh

```
$ cd /opt/common-voice/
$ docker exec db /usr/bin/mysqldump -u root voiceweb > backup.sql
```

## Locally

Using locally brew-installed MySQL server.

```
$ brew services start mysql 
$ scp -r yugtun@167.172.122.80:/opt/common-voice/backup.sql .
$ mysql -u root voiceweb < backup-20220414.sql
$ echo "SELECT path,sentence FROM clips;" | mysql -u root voiceweb > savedClips.tsv
$ cat savedClips.tsv
$ brew services stop mysql
```

# Update Sentences on Droplet - ssh

Website: https://app.yugtun.com/ipk/speak

```
$ cd /opt/common-voice/server/data/ipk/
$ vim ipk-examples.txt
$ docker-compose down
$ docker-compose up -d      
```

monitor with:
```
$ docker logs -f web
```
