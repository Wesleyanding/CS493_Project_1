#!/bin/sh

status() {
    printf "\n\n===============================================\n"
    printf "%s\n" "$1"
    printf -- "----------------------------------------------\n\n"
}

status "Running tests"

### Business tests

status 'POST business should create a new business'
curl -X POST \
-H "Content-Type: application/json" \
-d '{  "name": "Test Business",
        "address": "123 Test St",
        "city": "Test City",
        "state": "TS",
        "zip": "12345",
        "phone": "123-456-7890",
        "category": {
            "name": "example category",
            "subcategories": [
            { "name": "Subcat 1" },
            { "name": "Subcat 2" }
            ]
        },
        "website": "test.com",
        "email": "test@test.com" }' \
http://localhost:8086/businesses

status 'GET businesses should return all businesses'
curl http://localhost:8086/businesses

status 'GET business should return a single business'
curl http://localhost:8086/businesses/5

status 'PUT business should update a business'
curl -X PUT \
-H "Content-Type: application/json" \
-d '{  "name": "PUT Test Business",
        "address": "123 Test St",
        "city": "ReTest City",
        "state": "TS",
        "zip": "12345",
        "phone": "123-456-7890",
        "category": {
            "name": "example category",
            "subcategories": [
            { "name": "Subcat 1" },
            { "name": "Subcat 2" }
            ]
        },
        "website": "test.com",
        "email": "test@test.com" }' \
http://localhost:8086/businesses/0

status 'DELETE business should delete a business'
curl -X DELETE http://localhost:8086/businesses/2


### REVIEW tests

status 'POST review should create a new review'
curl -X POST \
-H "Content-Type: application/json" \
-d '{  "businessID": 5,
        "stars": 5,
        "review": "This is a test review",
        "dollar_signs": "Test Reviewer" }' \
http://localhost:8086/reviews

status 'GET reviews should return all reviews'
curl http://localhost:8086/reviews

status 'GET review should return a single review'
curl http://localhost:8086/reviews/5

status 'PUT review should update a review'
curl -X PUT \
-H "Content-Type: application/json" \
-d '{  "businessID": "5",
        "stars": 5,
        "review": "This is a PUT test review",
        "dollar_signs": "Test Reviewer" }' \
http://localhost:8086/reviews/0

status 'DELETE review should delete a review'
curl -X DELETE http://localhost:8086/reviews/2


status 'GET reviews for a business should return all reviews for a business'
curl http://localhost:8086/businesses/5/reviews

### PHOTO tests

status 'POST photo should create a new photo'
curl -X POST \
-H "Content-Type: application/json" \
-d '{  "businessID": "5",
        "url": "This is a test photo",
        "caption": "this is a test caption" }' \
http://localhost:8086/photos

status 'GET photos should return all photos'
curl http://localhost:8086/photos

status 'GET photo should return a single photo'
curl http://localhost:8086/photos/5

status 'PUT photo should update a photo'
curl -X PUT \
-H "Content-Type: application/json" \
-d '{  "businessID": 5,
        "url": "This is a PUT test photo",
        "caption": "this is a test caption" }' \
http://localhost:8086/photos/0

status 'DELETE photo should delete a photo'
curl -X DELETE http://localhost:8086/photos/2

status 'GET business photos should return all photos for a business'
curl http://localhost:8086/businesses/4/photos

status 'End of tests'