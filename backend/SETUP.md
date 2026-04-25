# Backend Setup 

1. Install node modules

```bash
pnpm init
```
### Install nodemon devDependencies

```bash
pnpm add -D nodemon
```
### Install other dependencies (packages are already in package.json)

```bash
pnpm install
```
### Start the backend server

```bash
pnpm run dev
```


# Run the docker container (inside backend folder)

```bash
docker run -p 5000:5000 --env-file .env auth-service
```


# Sample comment