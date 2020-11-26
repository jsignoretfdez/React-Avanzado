import client from './client';

const tweetsBaseUrl = '/api/v1';

export const getLatestTweets = () => {
  const url = `${tweetsBaseUrl}/tweets?_expand=user&_embed=likes&_sort=createdAt&_order=desc`;
  return client.get(url);
};

export const getTweetDetail = tweetId => {
  const url = `${tweetsBaseUrl}/tweets/${tweetId}`;
  return client.get(url);
};

export const createTweet = tweet => {
  const url = `${tweetsBaseUrl}/tweets`;
  return client.post(url, tweet);
};

export const createLike = tweetId => {
  const url = `${tweetsBaseUrl}/tweets/${tweetId}/likes`;
  return client.post(url);
};

export const deleteLike = likeId => {
  const url = `${tweetsBaseUrl}/likes/${likeId}`;
  return client.delete(url);
};
