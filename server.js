const express = require('express');
const app = express();
app.use(express.json());

var port = 8086;
const businesses = [];
const reviews = [];
const photos = [];

// Businesses endpoints
app.get('/businesses', (req, res, next) => {
    var page = parseInt(req.query.page) || 1;
    var numPerPage = 10;
    var lastPage = Math.ceil(businesses.length / numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;
    var start = (page - 1) * numPerPage;
    var end = start + numPerPage;
    var pageBusinesses = businesses.slice(start, end);
    var links = {};
    if (page < lastPage) {
        links.nextPage = `/businesses?page=${page + 1}`;
        links.lastPage = `/businesses?page=${lastPage}`;
    } 
    if (page > 1) {
        links.prevPage = `/businesses?page=${page - 1}`;
        links.firstPage = '/businesses?page=1';
    }
    res.status(200).json({
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totaCount: businesses.length,
        businesses: pageBusinesses,
        links: links
    });
});

app.get('/businesses/:businessID', (req, res, next) => {
    const businessID = parseInt(req.params.businessID);
    if (businesses[businessID] !== null) {
        res.status(200).json(businesses[businessID]);
    } else {
        res.status(404);
        res.send('Business not found');
        next();
    }
});

app.get('/businesses/:businessID/reviews', (req, res, next) => {
    const businessID = req.params.businessID;
    if (businessID < 0 || businessID >= businesses.length || businesses[businessID] === null) {
        res.status(404);
        res.send('Business not found');
        next();
    }

    // THIS DOESN'T WORK LIKE ITS SUPPOSED TO. THE BUSINESS ID returns TypeError: Cannot read properties of undefined (reading 'businessID')
    businessReviews = [];
    // loop through reviews array and find reviews that match the businessID
    for (var i = 0; i < reviews.length; i++) {
        if (parseInt(reviews[i].businessID) === businessID) { 
            businessReviews.push(reviews[i]);
            res.status(200).json(businessReviews);
            return;
        }
    }
    res.status(200).json(businesses[businessID].reviews);
});

app.get('/businesses/:businessID/photos', (req, res, next) => {
    const businessID = parseInt(req.params.businessID);
    if (businessID < 0 || businessID >= businesses.length || businesses[businessID] === null) {
        res.status(404);
        res.send('Business not found');
        next();
    }
    // check if photos array is empty
    if (photos.length === 0) {
        res.status(404);
        res.send('Photos not found');
        next();
    }

    // THIS DOESN'T WORK LIKE ITS SUPPOSED TO. THE BUSINESS ID returns TypeError: Cannot read properties of undefined (reading 'businessID')

    buisnessPhotos = [];
    // loop through photos array and find photos that match the businessID
    for (var i = 0; i < photos.length; i++) {
        if (parseInt(photos[i].businessID) === businessID) {
            buisnessPhotos.push(photos[i]);
            res.status(200).json(buisnessPhotos);
            return;
        }
    }
    res.status(404);
    res.send('Photos not found');
    next();
});

app.delete('/businesses/:businessID', (req, res, next) => {
    const businessID = req.params.businessID;
    if (businessID < 0 || businessID >= businesses.length) {
        res.status(404);
        res.send('Business not found');
        next();
    }
    businesses[businessID] = null;
    res.status(204).end();
});

app.put('/businesses/:businessID', (req, res, next) => {
    const businessID = req.params.businessID;
    if (businessID < 0 || businessID >= businesses.length || businessID === null) {
        res.status(404);
        res.send('Business not found');
        next();
    }
    if (!req.body.name && !req.body.address && !req.body.city && !req.body.state && !req.body.zipcode && !req.body.phone && !req.body.email && !req.body.website) {
        res.status(400);
        res.send('Name, address, city, state, zipcode, phone, email, and website are required');
        next();
    }
    businesses[businessID] = req.body;
    res.status(200).json({
        id: businessID,
        links: {
            business: `/businesses/${businessID}`
        }
    });
});

app.post('/businesses', (req, res, next) => {
    if (!req.body.name && !req.body.address && !req.body.city && !req.body.state && !req.body.zipcode && !req.body.phone && !req.body.email && !req.body.website) {
        res.status(400);
        res.send('Name, address, city, state, zipcode, phone, email, and website are required');
        next();
    }
    businesses.push(req.body);
    var id = businesses.length - 1;
    res.status(201).json({
        id: id,
        links: {
            business: `/businesses/${id}`
        }
    });    
});

// Reviews endpoints
app.get('/reviews', (req, res, next) => {
    var page = parseInt(req.query.page) || 1;
    var numPerPage = 10;
    var lastPage = Math.ceil(reviews.length / numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;
    var start = (page - 1) * numPerPage;
    var end = start + numPerPage;
    var pageReviews = reviews.slice(start, end);
    var links = {};
    if (page < lastPage) {
        links.nextPage = `/reviews?page=${page + 1}`;
        links.lastPage = `/reviews?page=${lastPage}`;
    } 
    if (page > 1) {
        links.prevPage = `/reviews?page=${page - 1}`;
        links.firstPage = '/reviews?page=1';
    }
    res.status(200).json({
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totalCount: reviews.length,
        reviews: pageReviews,
        links: links
    });
});

app.get('/reviews/:reviewID', (req, res, next) => {
    const reviewID = req.params.reviewID;
    if (reviewID < 0 || reviewID >= reviews.length || reviews[reviewID] === null) {
        res.status(404);
        res.send('Review not found');
        next();
    }
    res.status(200).json(reviews[reviewID]);
});

app.put('/reviews/:reviewID', (req, res, next) => {
    const reviewID = req.params.reviewID;
    if (reviewID < 0 || reviewID >= reviews.length || reviews[reviewID] === null) {
        res.status(404);
        res.send('Review not found');
        next();
    }
    if (!req.body.stars && !req.body.dollar_signs && !req.body.review && !req.body.business) {
        res.status(400);
        res.send('Stars, Dollars, Review, and Business are required');
        next();
    }
    reviews[reviewID] = req.body;
    res.status(200).json({
        links: {
            business: `/reviews/${reviewID}`
        }
    });
});

app.delete('/reviews/:reviewID', (req, res, next) => {
    const reviewID = req.params.reviewID;
    if (reviewID < 0 || reviewID >= reviews.length || reviews[reviewID] === null) {
        res.status(404);
        res.send('Review not found');
        next();
    }
    reviews[reviewID] = null;
    res.status(204).end();
});

app.post('/reviews', (req, res, next) => {
    if (!req.body.stars && !req.body.dollar_signs && !req.body.review && !req.body.business) {
        res.status(400);
        res.send('Stars, Dollars, Review, and Business are required');
        next();
    }
    reviews.push(req.body);
    var id = reviews.length - 1;
    res.status(201).json({
        id: id,
        links: {
            review: `/reviews/${id}`
        }
    });
});

// Photos endpoints
app.get('/photos', (req, res, next) => {
    res.status(200).json({
        photos: photos
    });
});

app.get('/photos/:photoID', (req, res, next) => {
    const photoID = req.params.photoID;
    if (photoID < 0 || photoID >= photos.length || photos[photoID] === null) {
        res.status(404);
        res.send('Photo not found');
        next();
    }
    res.status(200).json(photos[photoID]);
});

app.put('/photos/:photoID', (req, res, next) => {
    const photoID = req.params.photoID;
    if (photoID < 0 || photoID >= photos.length || photos[photoID] === null) {
        res.status(404);
        res.send('photo not found');
        next();
    }
    if (!req.body.url && !req.body.caption) {
        res.status(400);
        res.send('URL and caption are required');
        next();
    }
    photos[photoID] = req.body;
    res.status(200).json({
        links: {
            business: `/photos/${photoID}`
        }
    });
});

app.delete('/photos/:photoID', (req, res, next) => {
    const photoID = req.params.photoID;
    if (photoID < 0 || photoID >= photos.length || photos[photoID] === null) {
        res.status(404);
        res.send('Review not found');
        next();
    }
    photos[photoID] = null;
    res.status(204).end();
});

app.post('/photos', (req, res, next) => {
    if (!req.body.url && !req.body.caption) {
        res.status(400);
        res.send('URL and caption are required');
        next();
    }
    photos.push(req.body);
    var id = photos.length - 1;
    res.status(201).json({
        id: id,
        links: {
            photo: `/photos/${id}`
        }
    });
});

app.listen(port, () => console.log('Server running on port http://localhost:8086/'));