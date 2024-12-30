import React, { useEffect, useState } from 'react';
import GetAllReview from '../../Services/Reviews';
import ReviewsComponent from '../../Component/ReviewComponent';
import { Review } from './types';




const ReviewsContainer: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [page, setPage] = useState(1);
  
  const [filter, setFilter] = useState<'true' | 'false'>('true');
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await GetAllReview(page, filter, search);
        
        if(data && data.length>0 && data[0]){
              setReviews(data[0].reviews || []); 
          setTotalPages(data[0].totalCount); 
        }
         else{
          setReviews([]);
          setTotalPages(0);
         }
       
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page, filter]);

  const handleSortToggle = () => {
    const newOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    setSortOrder(newOrder);
    setFilter(newOrder === 'newest' ? 'true' : 'false');
  };

  const handleFilterChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(e.target.value as 'true' | 'false');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredReviews = (reviews || [])
    .sort((a, b) =>
      filter === 'true'
        ? new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
        : new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
    )
    .filter(review =>
      review.username.toLowerCase().includes(search.toLowerCase()) ||
      review.review.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <ReviewsComponent
      reviews={filteredReviews}
      loading={loading}
      error={error}
      sortOrder={sortOrder}
      handleSortToggle={handleSortToggle}
      handleFilterChange={handleFilterChange}
      filter={filter}
      totalPages={totalPages}
      setPage={setPage}
      page={page}
      handleSearchChange={handleSearchChange}
      search={search}
    />
  );
};

export default ReviewsContainer;
