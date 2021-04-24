# Bersamabisa App (bersamabisaid)

Bersamabisa main web

## Todo (this week)
- PageAdminProgramIndex: tambah fitur pagination
- PageAdminProgramIndex: tabel list donatur
- PageHome
  - hapus slider program (ganti dengan redirect ke PageProgramList)
  - fix bad whitespace
  - Isi konten (Profil, deskripsi singkat section, kontak)
- PageProgramList: tambah fitur pagination

## More Todo (sorted by needs & priority)
- Implements SSR
- PageAdminProgramForm: Implements firebase image resize extensions
- Hapus prefix /program untuk setiap program
  - Untuk validasi link menggunakan $router.resolve() + getProgramByURL
- BBID Blogs

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
    "transaction_id": string,
    "order_id": string,
    "transaction_status": string,
    "fraud_status": string,
  }
  // for possible data see https://docs.midtrans.com/en/after-payment/http-notification?id=sample-in-curl
  ```
- response: *HTTP status code only*

### Get Transaction Status
Hanya perantara `Get Transaction Status Core API midtrans`

- endpoint: `/midtrans/transaction/[transaction-id]`
- method: GET
- request header:
  - content-type: application/json
- response: lihat dokumentasi di https://api-docs.midtrans.com/#get-transaction-status


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
