let mockReviews = [];
const maxRating = 5;

function avgRating() {
    if (mockReviews.length === 0) return 'No ratings avaliable.'

    let sum = 0;
    for (let i = 0; i < mockReviews.length; i++) {
        sum += parseFloat(mockReviews[i].rating);
    }
    return (sum / mockReviews.length).toFixed(1) + ' / ' + maxRating;
}

function showAvgRating() {
    const avgRatingElement = document.createElement('div');
    avgRatingElement.classList.add('avg-rating')

    const avgRatingEl = document.createElement('p');
    avgRatingEl.textContent = avgRating();

    if (avgRatingEl)
        avgRatingElement.appendChild(avgRatingEl);

    return avgRatingElement;
}

function renderAvgRating() {
    const avgRatingElement = document.getElementById('avg-rating');
    avgRatingElement.innerHTML = '';
    avgRatingElement.appendChild(showAvgRating());
}

function saveToLocalStorage(reviewList) {
    const reviewListString = JSON.stringify(reviewList);
    localStorage.setItem('all-reviews', reviewListString);
}

function loadFromLocalStorage() {
    const reviewListString = localStorage.getItem('all-reviews');
    const reviewList = JSON.parse(reviewListString);
    return reviewList;
}

function renderReviewList() {
    const reviewListElement = document.getElementById('all-reviews');
    reviewListElement.innerHTML = '';

    if (mockReviews.length === 0) {
        reviewListElement.style.display = 'none';
    } else {
        reviewListElement.style.display = 'block';
        mockReviews.forEach((review) => {
            reviewListElement.appendChild(createReviewItem(review));
        });
    }
    saveToLocalStorage(mockReviews);
}

function createReviewItem(review) {
    const reviewElement = document.createElement('div');
    reviewElement.classList = ['review'];

    const commentElement = document.createElement('p');
    commentElement.textContent = review.review;
    commentElement.classList.add('comment');
    reviewElement.appendChild(commentElement);

    const ratingElement = document.createElement('p');
    ratingElement.textContent = review.rating + ' / ' + maxRating;
    reviewElement.appendChild(ratingElement);

    const deleteReviewButton = document.createElement('button');
    deleteReviewButton.textContent = 'Remove';
    deleteReviewButton.onclick = () => {
        mockReviews = mockReviews.filter((r) => {
            return r !== review;
        });
        renderReviewList();
        renderAvgRating();
    }
    reviewElement.appendChild(deleteReviewButton);

    return reviewElement;
}

const addReviewButton = () => {
    const reviewInput = document.getElementById('review-input');
    const newReviewInput = reviewInput.value;

    const ratingInput = document.getElementById('rating-input');
    const newRatingInput = ratingInput.value;

    const errorMessage = document.getElementById('error-message');

    if (!newRatingInput) {
        errorMessage.textContent = 'Rating is required'
        return;
    }

    if (newRatingInput < 1 || newRatingInput > 5) {
        errorMessage.textContent = 'Rating must be between 1 and 5.';
        return;
    }

    errorMessage.textContent = '';

    const newReview = {
        review: newReviewInput,
        rating: newRatingInput,
        star: starRating,
    };

    mockReviews.push(newReview);
    renderReviewList();
    renderAvgRating();
    reviewInput.value = '';
    ratingInput.value = '';
};

const loadedReviews = loadFromLocalStorage();
if (loadedReviews) {
    mockReviews = loadedReviews;
}

renderReviewList();
renderAvgRating();