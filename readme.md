# Orders API

This project implements a RESTful API built using **Node.js** and **Express** that manages orders. The API allows users to fetch orders with pagination support.

## Features

- Fetch orders with pagination (`page` and `limit` query parameters).
- Orders are sorted by creation date in descending order.
- Validates pagination parameters to ensure they are positive integers.
- Handles errors gracefully and returns appropriate status codes.

## Requirements

- **Node.js** and **npm** (or **yarn**) installed.
- **PostgreSQL** database with an `orders` table.
- Dependencies: `express`, `pg` (PostgreSQL client), etc.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Inzamam-Khan/thinkAcaSection4.gitl>

```


## Endpoint

## `GET /orders`

**Retrieves a paginated list of orders sorted by the `created_at` field in descending order.**

## Query Parameters

### | Parameter | Type    | Default | Description                                                                 |
### |-----------|---------|---------|-----------------------------------------------------------------------------|
### | `page`    | number  | 1       | The page number of the results to retrieve. It is used to calculate the `offset` for pagination. |
### | `limit`   | number  | 10      | The number of orders to return per page. It defines the `limit` for the number of results. |

## Success Response-Code: `200 OK`

## Content:`json`
``bash 
{
    "success": true,
    "orders": [
        {
            "id": 1,
            "user_id": 123,
            "total_price": 250.0,
            "status": "completed",
            "created_at": "2025-01-01T10:00:00Z"
        },
        {
            "id": 2,
            "user_id": 124,
            "total_price": 120.5,
            "status": "pending",
            "created_at": "2025-01-02T15:30:00Z"
        }
    ]
}
```
## Fixed Code
```bash
app.get("/orders", async (req, res) => {
    try {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;

        
        if (page < 1 || limit < 1) {
            return res.status(400).json({ success: false, message: "Invalid Parameters" });
        }

        
        const ordersQuery = `
            SELECT id, user_id, total_price, status, created_at 
            FROM orders 
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2
        `;
        
        
        const { rows } = await db.query(ordersQuery, [limit, offset]);

        
        res.status(200).json({ success: true, orders: rows });
    } catch (error) {
        console.error("Error in fetching orders:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
```







## Optimization


**Pagination**: Use LIMIT and OFFSET for fetching smaller chunks of data.
**Indexing**: Index frequently queried columns like created_at.
**Limit the columns**: Fetch only the necessary columns from the database.
**Optimize Database Configuration**: Ensure PostgreSQL is optimized for performance.
**Caching**: Use caching to store frequently accessed data temporarily.
**Frontend Optimization**: Consider lazy loading or infinite scroll for the user interface.
