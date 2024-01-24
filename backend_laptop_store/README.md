# Laptop store backend

## API

Root path `/api/v1`

### Success response structure:

```json
{
    "success": true,
    "message": "",
    "result": "Any result"
}
```

### Error response structure, success always false if send error response

**Standard**

```json
{
    "code": 404,
    "success": false,
    "errors": {
        "message": ""
    }
}
```

**Validation**

```json
{
    "code": 404,
    "success": false,
    "errors": {
        "email": "invalid",
        "phone": "invalid"
    }
}
```

## Three type route

-   public `don't need token`
-   private `need token` (account has role `customer | admin`)
-   admin `need token` (account has role admin)

### Get token when you login

```
POST   /auth/login
```

Request

```json
{
    "email": "email",
    "password": "password"
}
```

Response

```json
{
    ...
    "result": "token",
}
```

### Register

```
POST   /auth/register-admin
POST   /auth/register-customer
```

Request

```json
{
    "fullName": "fullName",
    "email": "email",
    "password": "password"
}
```

## All path

**1. Product**

```
1.1 GET    /admin/products/find-all
1.2 GET    /public/products/sort-latest
1.3 GET    /public/products/:slug
1.4 POST   /admin/products/create
1.5 PUT    /admin/products/edit/:id
1.6 PATCH  /admin/products/discount/:id
1.7 DELETE /admin/products/delete/:id
```

Request (1.4)

```json
{
    "name": "product 7",
    "price": 100000,
    "description": "dang cap nhat",
    "categoryId": 2,
    "brandId": 3
}
```

Request (1.5)

```json
{
    "discount": 50000
}
```

**2. Category**

```
2.1 GET    /public/categories/find-all
2.2 POST   /admin/categories/create
2.3 PUT    /admin/categories/edit/:id
2.4 DELETE /admin/categories/delete/:id
2.5 DELETE /admin/categories/delete-all
```

Request (2.2 & 2.3)

```json
{
    "name": "category 6",
    "url": "category-6"
}
```

**3. Brand**

```
3.1 GET    /public/brands/find-all
3.2 POST   /admin/brands/create
3.3 PUT    /admin/brands/edit/:id
3.4 DELETE /admin/brands/delete/:id
3.5 DELETE /admin/brands/delete-all
```

Request (3.2 & 3.3)

```json
{
    "name": "brand 6"
}
```

**4. Authentication**

```
4.1 POST   /auth/login
4.2 POST   /auth/register-admin
4.3 POST   /auth/register-customer
```

Request (4.1)

```json
{
    "email": "email",
    "password": "password"
}
```

Request (4.2 & 4.3)

```json
{
    "fullName": "fullName",
    "email": "email",
    "password": "password"
}
```

**5. Account**

```
5.1 GET    /admin/accounts/find-all
5.2 PUT    /private/accounts/edit
5.3 DELETE /admin/accounts/delete/:id
```

Request (5.2)

```json
{
    "username": "username",
    "fullName": "fullName"
}
```

## Parameters

### Page

-   `page_number` -> current page
-   `page_size` -> item per page

## Docs

-   [io.jsonwebtoken](https://github.com/jwtk/jjwt)
-   [Implement method SecurityFilterChain filterChain(HttpSecurity http)](https://www.bezkoder.com/spring-boot-security-jwt/#Configure_Spring_Security)

## Fix

**1. Spring Data MongoDB - Could not safely identify store assignment for repository candidate interface**

[Specify package repository](https://www.baeldung.com/spring-multiple-data-modules#3-using-package-based-scoping)

**2. open-in-view**

[Intro OSIV ANTI-PATTERN](https://stackoverflow.com/questions/30549489/what-is-this-spring-jpa-open-in-view-true-property-in-spring-boot)

[Warning](https://backendhance.com/en/blog/2023/open-session-in-view/)

**3. jwt signature key**

[Some algorithm have `secret key` or `private and public` key](https://github.com/jwtk/jjwt?tab=readme-ov-file#signed-jwts)

**4. Response unauthorized**

Send response by project format

## Process

-   [x] fix 1

-   [ ] fix 2

-   [x] fix 3

-   [x] fix 4
