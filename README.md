## BaseUrl: [https://book-catalog-a8-6s035jd5u-mehraz.vercel.app](https://book-catalog-a8-6s035jd5u-mehraz.vercel.app)

### Login Credentials
##### Admin - Email: mehraz@gmail.com, password: mehraz123
##### Customer - Email: mahtab@gmail.com, password: mahtab123
#### Route	Method
* /api/v1/auth/signup	(POST)
* /api/v1/auth/signin	(POST)

#### Route	Method
* /api/v1/users	(GET)
* /api/v1/users/:id	(GET)
* /api/v1/users/:id	(PATCH)
* /api/users/:id	(DELETE)

#### Category Routes
* /api/v1/categories/create-category	(POST)
* /api/v1/categories	(GET)
* /api/v1/categories/:id	(GET)
* /api/v1/categories/:id	(PATCH)
* /api/v1/categories/:id	(DELETE)

#### Book Routes
* /api/v1/books/create-book	(POST)
* /api/v1/books	(GET)
* /api/v1/books?	(GET)
* /api/v1/books/:id	(GET)
* /api/v1/books/:id	(PATCH)
* /api/v1/books/:id	(DELETE)
* /api/v1/books/:categoryId/category	(GET)

#### Orders Routes
* api/v1/orders/create-order	(POST)
* api/v1/orders	(GET)
* api/v1/orders/:orderId	(GET)

#### Profile Routes
* /api/v1/profile	(GET)
