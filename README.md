# Notrix JavaScript SDK


### Install

```bash
npm install notrix
```

### Examples

#### Create Checkout Session

```js
import Client from "notrix";

let client = new Client("SECRET_API_KEY", "PROJECT_ID");

let checkoutSession = await client.createCheckoutSession(
    [
        {
            name: "Bike",
            description: "green",
            price: 32.56,  // USD
            quantity: 1,
            imageURL: "https://example.com/bike.png"  // make sure the image is available from the notrix.io domain
        }
    ],
    "https://example.com/success",
    "https://example.com/cancel",
);
console.log(checkoutSession.url);  // redirect the user here to pay
```

#### Check Payment Status
```js
import Client from "notrix";

let client = new Client("SECRET_API_KEY", "PROJECT_ID");

let paymentConfirmed = await client.isPaid(checkoutSession.paymentRequestToken);  // true / false
```
