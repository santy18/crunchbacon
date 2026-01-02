# Starting
```
docker compose up -d --build
```

this will get caddy up and running with our app served. and that is it. 

when needing to deploy:

```
git pull origin master
docker compose up -d --build
```

# DEV
```
npm run dev
```

