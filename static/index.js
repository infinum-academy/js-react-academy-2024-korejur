let mockReviews = [];
const maxRating = 5;

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
    mockReviews.forEach((review) => {
        reviewListElement.appendChild(createReviewItem(review));
    });

    saveToLocalStorage(mockReviews);
}

function createReviewItem(review) {
    const reviewElement = document.createElement('div');
    reviewElement.classList = ['review'];

    const commentElement = document.createElement('p');
    commentElement.textContent = review.review;
    commentElement.classList.add('comment'); // Dodajte klasu za komentar
    reviewElement.appendChild(commentElement);

    const reviewItemRatingElement = document.createElement('p');
    reviewItemRatingElement.textContent = review.rating + ' / ' + maxRating;
    reviewElement.appendChild(reviewItemRatingElement);

    return reviewElement;
}

const addReviewButton = () => {
    const reviewInput = document.getElementById('review-input');
    const newReviewInput = reviewInput.value;

    const ratingInput = document.getElementById('rating-input');
    const newRatingInput = ratingInput.value;

    if (!newReviewInput || !newRatingInput) {
        return;
    }
    
    const newReview = {
        review: newReviewInput,
        rating: newRatingInput,
    };

    mockReviews.push(newReview);
    renderReviewList();
    reviewInput.value = '';
    ratingInput.value = '';
};

const loadedReviews = loadFromLocalStorage();
if (loadedReviews) {
    mockReviews = loadedReviews;
}

renderReviewList();