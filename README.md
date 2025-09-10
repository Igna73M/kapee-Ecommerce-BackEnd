# REST API Endpoints

## Products

- `GET /api/products` — List all products  
- `GET /api/products/:id` — Get product by ID  
- `POST /api/products` — Create product  
- `PATCH /api/products/:id` — Update product  
- `DELETE /api/products/:id` — Delete product  

## Banners

- `GET /api/banners` — List all banners  
- `GET /api/banners/:id` — Get banner by ID  
- `POST /api/banners` — Create banner  
- `PATCH /api/banners/:id` — Update banner  
- `DELETE /api/banners/:id` — Delete banner  

## Blog Posts

- `GET /api/blog-posts` — List all blog posts  
- `GET /api/blog-posts/:id` — Get blog post by ID  
- `POST /api/blog-posts` — Create blog post  
- `PATCH /api/blog-posts/:id` — Update blog post  
- `DELETE /api/blog-posts/:id` — Delete blog post  

## Brand Categories

- `GET /api/brand-categories` — List all brand categories  
- `GET /api/brand-categories/:name` — Get brand category by name  
- `POST /api/brand-categories` — Create brand category  
- `PATCH /api/brand-categories/:name` — Update brand category  
- `DELETE /api/brand-categories/:name` — Delete brand category  

## Hero Slides

- `GET /api/hero-slides` — List all hero slides  
- `GET /api/hero-slides/:id` — Get hero slide by ID  
- `POST /api/hero-slides` — Create hero slide  
- `PATCH /api/hero-slides/:id` — Update hero slide  
- `DELETE /api/hero-slides/:id` — Delete hero slide  

## Services

- `GET /api/services` — List all services  
- `GET /api/services/:title` — Get service by title  
- `POST /api/services` — Create service  
- `PATCH /api/services/:title` — Update service  
- `DELETE /api/services/:title` — Delete service  

---

## Sample `curl` Requests

### Product Examples

```sh
# List all products
curl http://localhost:5000/api/products

# Get product by ID
curl http://localhost:5000/api/products/<productId>

# Create product
curl -X POST http://localhost:5000/api/products -H "Content-Type: application/json" -d '{"name":"Test Product","description":"desc","price":10,"image":"url","category":"category"}'

# Update product
curl -X PATCH http://localhost:5000/api/products/<productId> -H "Content-Type: application/json" -d '{"name":"Updated"}'

# Delete product
curl -X DELETE http://localhost:5000/api/products/<productId>
```

### Banner Examples

```sh
curl http://localhost:5000/api/banners
curl http://localhost:5000/api/banners/<bannerId>
curl -X POST http://localhost:5000/api/banners -H "Content-Type: application/json" -d '{"title":"Banner","subtitle":"Sub","discount":"10%","image":"url","buttonText":"Shop"}'
curl -X PATCH http://localhost:5000/api/banners/<bannerId> -H "Content-Type: application/json" -d '{"title":"Updated"}'
curl -X DELETE http://localhost:5000/api/banners/<bannerId>
```

### Blog Post Examples

```sh
curl http://localhost:5000/api/blog-posts
curl http://localhost:5000/api/blog-posts/<postId>
curl -X POST http://localhost:5000/api/blog-posts -H "Content-Type: application/json" -d '{"title":"Blog","excerpt":"Excerpt","date":"2025-09-09","image":"url"}'
curl -X PATCH http://localhost:5000/api/blog-posts/<postId> -H "Content-Type: application/json" -d '{"title":"Updated"}'
curl -X DELETE http://localhost:5000/api/blog-posts/<postId>
```

### Brand Categories Examples

```sh
curl http://localhost:5000/api/brand-categories
curl http://localhost:5000/api/brand-categories/<name>
curl -X POST http://localhost:5000/api/brand-categories -H "Content-Type: application/json" -d '{"name":"NewCat","tagline":"Tag","initial":"N","bgColor":"bg-color"}'
curl -X PATCH http://localhost:5000/api/brand-categories/<name> -H "Content-Type: application/json" -d '{"tagline":"Updated"}'
curl -X DELETE http://localhost:5000/api/brand-categories/<name>
```

### Hero Slides Examples

```sh
curl http://localhost:5000/api/hero-slides
curl http://localhost:5000/api/hero-slides/<slideId>
curl -X POST http://localhost:5000/api/hero-slides -H "Content-Type: application/json" -d '{"title":"Slide","subtitle":"Sub","highlight":"High","discount":"10%","image":"url","buttonText":"Go"}'
curl -X PATCH http://localhost:5000/api/hero-slides/<slideId> -H "Content-Type: application/json" -d '{"title":"Updated"}'
curl -X DELETE http://localhost:5000/api/hero-slides/<slideId>
```

### Services Examples

```sh
curl http://localhost:5000/api/services
curl http://localhost:5000/api/services/<title>
curl -X POST http://localhost:5000/api/services -H "Content-Type: application/json" -d '{"icon":"Icon","title":"Service","description":"Desc"}'
curl -X PATCH http://localhost:5000/api/services/<title> -H "Content-Type: application/json" -d '{"description":"Updated"}'
curl -X DELETE http://localhost:5000/api/services/<title>
```
