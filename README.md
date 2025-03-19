# Web

- Just for practice purposes.
- The following commands may not work or follow the best practices.

## Frontend

- default port: 80
- API url: http://localhost:3002

### Launch

```bash
docker container run ashleylai/workshop:web
```

### Usage

- GET /
- GET /certifications
- GET /courses

## Backend

- default port: 3002
- env:
  - PORT={api port}
  - DB_PORT=6379
  - DB_HOST=localhost

### Launch

```bash
docker container run ashleylai/workshop:api
```

### Usage

- GET /
- GET /api/1.0/certifications
  - read JSON data from /src/data folder
- GET /api/1.0/courses
  - read data from database

## Database

- default port: 6379

### Launch

```bash
docker container run ashleylai/workshop:db
```

### Usage

```bash
$ redis-cli
> keys *
> hgetall course:1
```
