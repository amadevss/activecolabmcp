# Gateways

> Fuente: https://developers.activecollab.com/api-documentation/v1/invoicing/payments/gateways.html

ActiveCollab can receive two types of payments: PayPal and creadit card payments. For PayPal payments we use `PaypalExpressCheckoutGateway`, and for credit card processing we use one of the following gateways:

- `AuthorizeGateway`
- `BrainTreeGateway`
- `PaypalDirectPayment`
- `StripeGateway`

By default, there is no payment gateway configured:

**`GET /payment-gateways`** → HTTP 200

Respuesta:
```json
{
    "paypal": null,
    "credit_card": null
}
```

## Paypal Express Checkout

and PayPal using PayPal Express Checkout:

## Stripe

Stripe is used to process credit cars. Only parameter that is required is API key. Lets configure the system to use a API for testing:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "credit_card": {
        "type": "StripeGateway",
        "api_key": "sk_test_REDACTED"
    }
}
```

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 1,
        "class": "StripeGateway",
        "url_path": "#",
        "is_live": false,
        "api_key": "sk_test_REDACTED"
    }
}
```

now lets try with Live mode:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "credit_card": {
        "type": "StripeGateway",
        "api_key": "sk_live_REDACTED"
    }
}
```

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 2,
        "class": "StripeGateway",
        "url_path": "#",
        "is_live": true,
        "api_key": "sk_live_REDACTED"
    }
}
```

## Authorize.net

To use Authorize.net, two parameters are needed: api_login_id and transaction_key. By default, system is in test mode:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "credit_card": {
        "type": "AuthorizeGateway",
        "api_login_id": "XYZ",
        "transaction_key": "ABC"
    }
}
```

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 3,
        "class": "AuthorizeGateway",
        "url_path": "#",
        "is_live": false,
        "api_login_id": "XYZ",
        "transaction_key": "ABC"
    }
}
```

to put the system in production mode, explicitely set is_live to true when setting up the gateway:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "credit_card": {
        "type": "AuthorizeGateway",
        "api_login_id": "XYZ",
        "transaction_key": "ABC",
        "is_live": true
    }
}
```

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 4,
        "class": "AuthorizeGateway",
        "url_path": "#",
        "is_live": true,
        "api_login_id": "XYZ",
        "transaction_key": "ABC"
    }
}
```

## Braintree

To configure ActiveCollab to process credit cards using Braintree, you need to provide merchant_id, public_key, private_key and merchant account ID for at least the default currency. By default, this gateway is in test mode:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "credit_card": {
        "type": "BrainTreeGateway",
        "merchant_id": "XYZ",
        "merchant_account_ids": {
            "USD": "123",
            "EUR": "456",
            "UNKNOWN": "Unknown currency is ignored"
        },
        "public_key": "ABC",
        "private_key": "FGH"
    }
}
```

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 5,
        "class": "BrainTreeGateway",
        "url_path": "#",
        "is_live": false,
        "merchant_id": "XYZ",
        "merchant_account_ids": {
            "EUR": "456",
            "USD": "123"
        },
        "public_key": "ABC",
        "private_key": "FGH"
    }
}
```

to put the system in production mode, explicitely set is_live to true when setting up the gateway:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "credit_card": {
        "type": "BrainTreeGateway",
        "merchant_id": "XYZ",
        "merchant_account_ids": {
            "USD": "123",
            "EUR": "456"
        },
        "public_key": "ABC",
        "private_key": "FGH",
        "is_live": true
    }
}
```

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 6,
        "class": "BrainTreeGateway",
        "url_path": "#",
        "is_live": true,
        "merchant_id": "XYZ",
        "merchant_account_ids": {
            "EUR": "456",
            "USD": "123"
        },
        "public_key": "ABC",
        "private_key": "FGH"
    }
}
```

## PayPal Direct Payment

PayPal can be used not just for offsite payments, but also to process credit cards. To configure ActiveCollab to process credit cards using PayPal gateway, you need to provide api_username, api_password and api_signature. By default, this gateway is in test mode:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "credit_card": {
        "type": "PaypalDirectGateway",
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    }
}
```

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 7,
        "class": "PaypalDirectGateway",
        "url_path": "#",
        "is_live": false,
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    }
}
```

to put the system in production mode, explicitely set is_live to true when setting up the gateway:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "credit_card": {
        "type": "PaypalDirectGateway",
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH",
        "is_live": true
    }
}
```

Respuesta:
```json
{
    "paypal": null,
    "credit_card": {
        "id": 8,
        "class": "PaypalDirectGateway",
        "url_path": "#",
        "is_live": true,
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    }
}
```

## PayPal off-site

Finally, there is PayPal off-site payment, where customers are redirected to PayPal website to complete the order, and than returned back to ActiveCollab when payment is made. Here's how it is configured:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "paypal": {
        "type": "PaypalExpressCheckoutGateway",
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    }
}
```

Respuesta:
```json
{
    "paypal": {
        "id": 9,
        "class": "PaypalExpressCheckoutGateway",
        "url_path": "#",
        "is_live": false,
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    },
    "credit_card": {
        "id": 8,
        "class": "PaypalDirectGateway",
        "url_path": "#",
        "is_live": true,
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    }
}
```

By default, this gateway is in test mode. To put the system in production mode, explicitely set is_live to true when setting up the gateway:

**`PUT /payment-gateways`** → HTTP 200

Payload:
```json
{
    "paypal": {
        "type": "PaypalExpressCheckoutGateway",
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH",
        "is_live": true
    }
}
```

Respuesta:
```json
{
    "paypal": {
        "id": 10,
        "class": "PaypalExpressCheckoutGateway",
        "url_path": "#",
        "is_live": true,
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    },
    "credit_card": {
        "id": 8,
        "class": "PaypalDirectGateway",
        "url_path": "#",
        "is_live": true,
        "api_username": "XYZ",
        "api_password": "ABC",
        "api_signature": "FGH"
    }
}
```

Configured gateways can be cleared by sending following DELETE commands:

**`DELETE /payment-gateways/clear-paypal`** → HTTP 200

**`DELETE /payment-gateways/clear-credit-card`** → HTTP 200

Lets confirm that this actually cleared the settings:

**`GET /payment-gateways`** → HTTP 200

Respuesta:
```json
{
    "paypal": null,
    "credit_card": null
}
```
