## ---- POSTEGRES
docker run \
    --name postgres \
    -e POSTGRES_USER=rickelton \
    -e POSTGRES_PASSWORD=minhasenha \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps
docker exec -it postgres /bin/bash

## ---- Cliente para o banco postgres
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## ---- MONGODB
docker run \
    --name dbmongo \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4

## ---- Cliente para o banco mongodb
docker run \
    --name mongoclient \
    -d \
    -p 17017:3000 \
    --link dbmongo:dbmongo \
    mongoclient/mongoclient

## ---- Criando user
docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({ user: 'rickelton', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois' }] })"