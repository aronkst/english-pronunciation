run:
	docker compose -f docker-compose.yml up

start:
	docker compose -f docker-compose.yml up -d

stop:
	docker compose stop

log:
	docker compose logs
