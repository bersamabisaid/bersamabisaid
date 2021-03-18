# Bersamabisa App (bersamabisaid)

Bersamabisa main web

## Todo
### Membuat api specs untuk program donasi
- **api/midtrans/create-transaction**

  api untuk membuat url redirect transaksi menggunakan midtrans snap integration, sebelumn diarahkan ke redirect url data transaksi/donasi direkam kedalam firestore terlebih dahulu, untuk data yang direkam didefinisikan terlebih dahulu menggunakan interface typescript

- **api/midtrans/payment-finish**

  redirect setelah melakukan transaksi via midtrans snap. berdasarkan dokumentasi dari midtrans kita akan mendapat query berupa `order_id`, `status_code` dan `transaction_status`. nantinya `order_id` akan digunakan untuk mengambil redirect url dari firestore pada collection, kemudian redirect ke alamat tersebut.

- **api/midtrans/payment-webhook**

  webhook untuk menerima notifikasi dari midtrans.

## API Specs
- endpoint prefix: `api/`
- seluruh response body pada api specs akan berada di `data` pada template berikut
  ```json
  {
    "success": boolean,
    "message": string,
    "data": {
      // data body...
    },
  }
  ```

### Membuat redirect url transaksi ke snap
api untuk membuat url redirect transaksi menggunakan midtrans snap integration, sebelum diberikan redirect url data transaksi/donasi  akan direkam kedalam firestore terlebih dahulu, untuk data yang direkam didefinisikan terlebih dahulu menggunakan interface typescript.

- endpoint: `/midtrans/create-transaction`
- method: POST
- request header:
  - content-type: application/json
  - accept: application/json
- request body: *typescript interface pada `shared/types/backendRequest`*
- response body:
  ```json
  {
    "redirect_url": string,
  }
  ```

### Snap Redirect URL
redirect url setelah melakukan transaksi via midtrans snap. berdasarkan dokumentasi dari midtrans kita akan mendapat query berupa `order_id`, `status_code` dan `transaction_status`. nantinya `order_id` akan digunakan untuk mengambil redirect url dari firestore pada collection, kemudian redirect ke alamat tersebut.

- endpoint: `/midtrans/payment-finish`
- method: POST
- request header:
  - content-type: application/json
  - accept: application/json
- request query: *typescript interface pada `shared/types/backendRequest`*
- response: redirect ke halaman setelah transaksi

### Midtrans webhook
Url untuk menerima notifikasi transaksi dari midtrans.

Webhook ini akan memverikasi `signature_key` yang dikirim oleh midtrans kemudian mengupdate data yang ada pada firestore

dokumentasi: https://docs.midtrans.com/en/after-payment/http-notification

- endpoint: `/midtrans/payment-webhook`
- method: POST
- request header:
  - content-type: application/json
- request body:
  ```json
  // below is required only, for full data see https://api-docs.midtrans.com/#get-transaction-status
  {
    "signature_key": string,
    "status_code": string,
    "status_message": string,
    "transaction_id": string,
    "order_id": string,
    "gross_amount": string,
    "payment_type": string,
    "transaction_time": string (timestamp),
    "transaction_status": string,
  }
  // for possible data see https://docs.midtrans.com/en/after-payment/http-notification?id=sample-in-curl
  ```
- response: *HTTP status code only*


## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
