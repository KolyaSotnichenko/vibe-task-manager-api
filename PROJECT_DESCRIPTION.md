# Time API

## Endpoint

`GET /time`

## Query Parameters

- `timezone` (optional): IANA timezone string. Default is `America/New_York`.

## Example Request

`GET /time?timezone=Europe/Kyiv`

## Example Response

```json
{
  "timezone": "Europe/Kyiv",
  "iso": "2026-03-24T12:34:56.789Z",
  "timestamp": 1774352096789
}
```

## Errors

- `400 INVALID_TIMEZONE` if timezone is invalid.
