import { deleteReview } from '@/fetchers/mutators';
import { swrKeys } from '@/fetchers/swrKeys';
import { IReview } from "@/typings/review.types";
import { act, render, screen, waitFor } from '@testing-library/react';
import { mutate } from 'swr';
import { ReviewItem } from './ReviewItem';

jest.mock('@/fetchers/mutators', () => ({
	deleteReview: jest.fn().mockReturnValue(null),
}));

jest.mock('swr', () => {
	const originalModule = jest.requireActual('swr');

	return {
		...originalModule,
		mutate: jest.fn(),
	};
});

describe('ReviewItem', () => {
  const mockReviewItem: IReview = {
    id: 1,
    show_id: 123,
    email: 'example@example.com',
    avatar: '/images/avatar.jpg',
    comment: 'This is a test review.',
    rating: 4,
  };

  (deleteReview as jest.Mock).mockResolvedValue(null);

  it('should call delete review and refresh the list on delete button click', async () => {
    render(<ReviewItem reviewItem={mockReviewItem} />);

    const deleteButton = screen.getByText('Remove');

    act(() => {
      deleteButton.click();
    });

    await waitFor(() => {
			expect(deleteReview).toHaveBeenCalledWith(swrKeys.review(mockReviewItem.id), {arg: undefined}); // zašto mora ovaj arg ići da bi radilo?
			expect(mutate).toHaveBeenCalledWith(swrKeys.reviews(mockReviewItem.show_id));
		});
  });
});
