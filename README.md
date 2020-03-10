## Tic tac toe

## Run locally

To install dependencies for running locally:
``` 
npm install
docker-compose --file docker-compose-dev.yml up -d
```

Run tests:
``` 
npm test
```

Run api server:
```
npm run dev
```

## Run in production
```
docker-compose --file docker-compose-prod.yml up -d
```

## Available endpoints:

Create game
[width of board, height of board, who starts game, how many hits are required for win]:
```
curl --request POST \
  --url http://localhost:3000/api/game \
  --header 'content-type: application/json' \
  --data '{
	"width": 6,
	"height": 6,
	"starter": "o",
	"maxRequired": 3
}'
```

Make a move[id(game id), x, y, value(valid values: x/o)]:
```
curl --request PUT \
  --url http://localhost:3000/api/game \
  --header 'content-type: application/json' \
  --data '{
	"id": 1,
	"x": 1,
	"y": 1,
	"value": "o" 
}'
```

Show a single game
```
curl --request GET \
  --url 'http://localhost:3000/api/game?id=1'
```

List all games
```
curl --request GET \
  --url http://localhost:3000/api/games
```
