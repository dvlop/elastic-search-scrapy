#init or create the container
docker run --name postgres-demo -it -p 5432:5432 -e POSTGRES_PASSWORD=mypassword marcote/postgres-demo

