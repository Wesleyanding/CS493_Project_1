# Part 1 - Design

## Businesses 

### Get

Request: GET /businesses
Request body: -
Response body: 
{
    "pageNumber": 1,
    "totalPages": 20,
    "pageSize": 10,
    "totalCount" 198,
    "businesses": [
        {
            "id": 1234,
            "name": "Example Business",
            "address": "123 Main St",
            "city": "Example City",
            "state": "Example State",
            "zip": "12345",
            "phone": "1234567890",
            "category": {
                "name": "Example Category",
                "subcategories": [
                    {
                        "name": "Subcategory 1"
                    },
                    {
                        "name": "Subcategory 2"
                    }
                ]
            }
            "website": "www.example.com",
            "email": "info@example.com"
        }
    ]
    "links": {
        "nextPage": "/businesses?page=2",
        "lastPage": "/businesses?page=20"
    }
}
Response status: 200 OK

Request: GET /businesses/{businessID}
Request body: -
Response body: 
{
    "business": [
        {
            "id": 1234,
            "name": "Example Business",
            "address": "123 Main St",
            "city": "Example City",
            "state": "Example State",
            "zip": "12345",
            "phone": "1234567890"
            "category": {
                "name": "Example Category",
                "subcategories": [
                    {
                        "name": "Subcategory 1"
                    },
                    {
                        "name": "Subcategory 2"
                    }
                ]
            }
            "website": "www.example.com",
            "email": "info@example.com"
        }
    ],
    "links": {
        "reviews": "/businesses/{businessID}/reviews",
        "photos": "/businesses/{businessID}/photos"
    }
}
Response status: 200 OK

Request: GET /businesses/{businessID}/reviews
Request body: -
Response body: 
{
    "pageNumber": 1,
    "totalPages": 20,
    "pageSize": 10,
    "totalCount" 198,
    "reviews": [
        {
            "id": 1234,
            "stars": 4.5,
            "dollar_signs": 3,
            "review": "Great place to visit!"
        },
        {
            "id": 2345,
            "stars": 5,
            "dollar_signs": 4,
            "review": "Amazing experience!"
        }
    ],
    "links": {
        "business": "/businesses/{businessID}
        "nextPage": "/businesses?page=2",
        "lastPage": "/businesses?page=20"
    }
}
Response status: 200 OK

Request: GET /businesses/{businessID}/photos
Request body: -
Response body: 
{
    "photos": [
        {
            "url": "https://example.com/photo1.jpg",
            "caption": "example caption 1"
        },
        {
            "url": "https://example.com/photo2.jpg",
            "caption": "example caption 2"
        }
    ],
    "links": {
        "business": "/businesses/{businessID}
    }
}
Response status: 200 OK

### Delete

Request: DELETE /businesses/{businessID}
Request body: -
Response body: 
{
    "status": "success",
    "message": "Business deleted successfully."
}
Response status: 200 OK

### Put

Request: PUT /businesses/{businessID}
Request body:
{
    "id": 1234,
    "name": "Example Business",
    "address": "123 Main St",
    "city": "Example City",
    "state": "Example State",
    "zip": "12345",
    "phone": "1234567890"
    "category": {
        "name": "Example Category",
        "subcategories": [
            {
                "name": "Subcategory 1"
            },
            {
                "name": "Subcategory 2"
            }
        ]
    }
    "website": "www.example.com",
    "email": "info@example.com"
}
Response body: 
{
    "status": "success",
    "message": "Business updated successfully."
}
Response status: 200 OK

### POST

Request: POST /businesses
Request body:
{
    "id": 1234,
    "name": "Example Business",
    "address": "123 Main St",
    "city": "Example City",
    "state": "Example State",
    "zip": "12345",
    "phone": "1234567890"
    "category": {
        "name": "Example Category",
        "subcategories": [
            {
                "name": "Subcategory 1"
            },
            {
                "name": "Subcategory 2"
            }
        ]
    }
    "website": "www.example.com",
    "email": "info@example.com"
}
Response body: 
{
    "status": "success",
    "message": "Business added successfully."
}
Response status: 201 Created

## Reviews

### Get

Request: GET /reviews
Request body: -
Response body: 
{
    "pageNumber": 1,
    "totalPages": 20,
    "pageSize": 10,
    "totalCount" 198,
    "reviews": [
        {
            "id": 1234,
            "stars": 4.5,
            "dollar_signs": 3,
            "review": "Great place to visit!",
            "business": "businessID"
        },
        {
            "id": 2345,
            "stars": 5,
            "dollar_signs": 4,
            "review": "Amazing experience!",
            "business": "businessID"
        }
    ],
    "links": {
        "nextPage": "/businesses?page=2",
        "lastPage": "/businesses?page=20"
    }
}
Response status: 200 OK

Request: GET /reviews/{reviewID}
Request body: -
Response body: 
{
    {
        "id": 1234,
        "stars": 4.5,
        "dollar_signs": 3,
        "review": "Great place to visit!",
        "business": "businessID"
    }
}
Response status: 200 OK

### Put

Request: PUT /reviews/{reviewID}
Request body:
{
    "id": 1234,
    "stars": 4.5,
    "dollar_signs": 3,
    "review": "Updated review",
    "business": "businessID"
}
Response body: 
{
    "status": "success",
    "message": "Review updated successfully."
}
Response status: 200 OK

### Delete

Request: DELETE /reviews/{reviewID}
Request body: -
Response body: 
{
    "status": "success",
    "message": "Review deleted successfully."
}
Response status: 200 OK

### POST

Request: POST /reviews
Request body:
{
    "id": 5678,
    "stars": 4,
    "dollar_signs": 2,
    "review": "Decent place to visit!",
    "business": "businessID"
}
Response body: 
{
    "status": "success",
    "message": "Review added successfully."
}
Response status: 201 Created

## Photos

### Get

Request: GET /photos
Request body: -
Response body: 
{
    "photos": [
        {
            "url": "https://example.com/photo1.jpg",
            "caption": "example caption 1"
        },
        {
            "url": "https://example.com/photo2.jpg",
            "caption": "example caption 2"
        }
    ]
}
Response status: 200 OK

Request: GET /photos/{photoID}
Request body: -
Response body: 
{
    "url": "https://example.com/photo.jpg",
    "caption": "example caption"
}
Response status: 200 OK

### Put

Request: PUT /photos/{photoID}
Request body:
{
    "url": "https://example.com/photo.jpg",
    "caption": "updated caption"
}
Response body: 
{
    "status": "success",
    "message": "Photo updated successfully."
}
Response status: 200 OK

### Delete

Request: DELETE /photos/{photoID}
Request body: -
Response body: 
{
    "status": "success",
    "message": "Photo deleted successfully."
}
Response status: 200 OK

### POST

Request: POST /photos
Request body:
{
    "url": "https://example.com/photo.jpg",
    "caption": "example caption"
}
Response body: 
{
    "status": "success",
    "message": "Photo added successfully."
}
Response status: 201 Created

