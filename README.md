
# REST API_v1 Endpoints

## Project Structure Update

All API_v1 routes are now aggregated and managed through `routes/indexRouters.ts`. This file imports and mounts all sub-routes (products, banners, blog posts, etc.) under the `/api_v1` path. The main server file (`src/server.ts`) uses only this single router for all API_v1 endpoints, making the codebase cleaner and easier to maintain.

To add or modify API_v1 endpoints, update the relevant route file in `routes/` and ensure it is included in `indexRouters.ts`.

## Products

- `GET /api_v1/products` — List all products  
- `GET /api_v1/products/:id` — Get product by ID  
- `POST /api_v1/products` — Create product  
- `PATCH /api_v1/products/:id` — Update product  
- `DELETE /api_v1/products/:id` — Delete product  

## Banners

- `GET /api_v1/banners` — List all banners  
- `GET /api_v1/banners/:id` — Get banner by ID  
- `POST /api_v1/banners` — Create banner  
- `PATCH /api_v1/banners/:id` — Update banner  
- `DELETE /api_v1/banners/:id` — Delete banner  

## Blog Posts

- `GET /api_v1/blog-posts` — List all blog posts  
- `GET /api_v1/blog-posts/:id` — Get blog post by ID  
- `POST /api_v1/blog-posts` — Create blog post  
- `PATCH /api_v1/blog-posts/:id` — Update blog post  
- `DELETE /api_v1/blog-posts/:id` — Delete blog post  

## Brand Categories

- `GET /api_v1/brand-categories` — List all brand categories  
- `GET /api_v1/brand-categories/:name` — Get brand category by name  
- `POST /api_v1/brand-categories` — Create brand category  
- `PATCH /api_v1/brand-categories/:name` — Update brand category  
- `DELETE /api_v1/brand-categories/:name` — Delete brand category  

## Hero Slides

- `GET /api_v1/hero-slides` — List all hero slides  
- `GET /api_v1/hero-slides/:id` — Get hero slide by ID  
- `POST /api_v1/hero-slides` — Create hero slide  
- `PATCH /api_v1/hero-slides/:id` — Update hero slide  
- `DELETE /api_v1/hero-slides/:id` — Delete hero slide  

## Services

- `GET /api_v1/services` — List all services  
- `GET /api_v1/services/:title` — Get service by title  
- `POST /api_v1/services` — Create service  
- `PATCH /api_v1/services/:title` — Update service  
- `DELETE /api_v1/services/:title` — Delete service  

---

## Sample `curl` Requests

### Product Examples

```sh
# List all products
curl http://localhost:5000/api_v1/products

# Get product by ID
curl http://localhost:5000/api_v1/products/<productId>

# Create product
curl -X POST http://localhost:5000/api_v1/products -H "Content-Type: application/json" -d '{"name":"Test Product","description":"desc","price":10,"image":"url","category":"category"}'

# Update product
curl -X PATCH http://localhost:5000/api_v1/products/<productId> -H "Content-Type: application/json" -d '{"name":"Updated"}'

# Delete product
curl -X DELETE http://localhost:5000/api_v1/products/<productId>
```

### Banner Examples

```sh
curl http://localhost:5000/api_v1/banners
curl http://localhost:5000/api_v1/banners/<bannerId>
curl -X POST http://localhost:5000/api_v1/banners -H "Content-Type: application/json" -d '{"title":"Banner","subtitle":"Sub","discount":"10%","image":"url","buttonText":"Shop"}'
curl -X PATCH http://localhost:5000/api_v1/banners/<bannerId> -H "Content-Type: application/json" -d '{"title":"Updated"}'
curl -X DELETE http://localhost:5000/api_v1/banners/<bannerId>
```

### Blog Post Examples

```sh
curl http://localhost:5000/api_v1/blog-posts
curl http://localhost:5000/api_v1/blog-posts/<postId>
curl -X POST http://localhost:5000/api_v1/blog-posts -H "Content-Type: application/json" -d '{"title":"Blog","excerpt":"Excerpt","date":"2025-09-09","image":"url"}'
curl -X PATCH http://localhost:5000/api_v1/blog-posts/<postId> -H "Content-Type: application/json" -d '{"title":"Updated"}'
curl -X DELETE http://localhost:5000/api_v1/blog-posts/<postId>
```

### Brand Categories Examples

```sh
curl http://localhost:5000/api_v1/brand-categories
curl http://localhost:5000/api_v1/brand-categories/<name>
curl -X POST http://localhost:5000/api_v1/brand-categories -H "Content-Type: application/json" -d '{"name":"NewCat","tagline":"Tag","initial":"N","bgColor":"bg-color"}'
curl -X PATCH http://localhost:5000/api_v1/brand-categories/<name> -H "Content-Type: application/json" -d '{"tagline":"Updated"}'
curl -X DELETE http://localhost:5000/api_v1/brand-categories/<name>
```

### Hero Slides Examples

```sh
curl http://localhost:5000/api_v1/hero-slides
curl http://localhost:5000/api_v1/hero-slides/<slideId>
curl -X POST http://localhost:5000/api_v1/hero-slides -H "Content-Type: application/json" -d '{"title":"Slide","subtitle":"Sub","highlight":"High","discount":"10%","image":"url","buttonText":"Go"}'
curl -X PATCH http://localhost:5000/api_v1/hero-slides/<slideId> -H "Content-Type: application/json" -d '{"title":"Updated"}'
curl -X DELETE http://localhost:5000/api_v1/hero-slides/<slideId>
```

### Services Examples

```sh
curl http://localhost:5000/api_v1/services
curl http://localhost:5000/api_v1/services/<title>
curl -X POST http://localhost:5000/api_v1/services -H "Content-Type: application/json" -d '{"icon":"Icon","title":"Service","description":"Desc"}'
curl -X PATCH http://localhost:5000/api_v1/services/<title> -H "Content-Type: application/json" -d '{"description":"Updated"}'
curl -X DELETE http://localhost:5000/api_v1/services/<title>
```
