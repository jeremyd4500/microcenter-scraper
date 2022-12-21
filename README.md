# Microcenter Scraper for 2230 M.2 SSD Inventory Alerts

**NOTE**: If you are interested in this, please fork the repository, adjust the `STORE_URLS` variable in `scraper.ts` to match your local stores. This image is specific to the GA Microcenter locations.

Create a free account at [mailtrap](https://mailtrap.io/) and configure the `Email API` section of your account portal. Make sure to configure a `Sending Domain` as well as an API token under the `API` section.

## Docker Compose

```bash
---
version: "1"
services:
  microcenter-scraper:
    image: jeremyd4500/microcenter-scraper:latest
    container_name: microcenter-scraper
    environment:
      - MAILTRAP_TOKEN=<Your mailtrap API token>
      - MAILTRAP_SENDER_EMAIL=<Your mailtrap domain email>
      - RECIPIENT=<recipient email>
      - HOURS=9,12,16,20
    restart: unless-stopped
```

## Docker CLI

```bash
docker run \
    --name microcenter-scraper \
    -e MAILTRAP_TOKEN=<Your mailtrap API token> \
    -e MAILTRAP_SENDER_EMAIL=<Your mailtrap domain email> \
    -e RECIPIENT=<recipient email> \
    -e HOURS=9,12,16,20 \
    -d  \
    jeremyd4500/microcenter-scraper:latest
```

## Environment

`HOURS` should be a comma-separated list of integer hours of the day you want to be notified at (in 24-hour format). Numeric values that are not integers or are outside the 24-hour range won't break the app but they also won't affect anything. Non-numeric values might break the app.
