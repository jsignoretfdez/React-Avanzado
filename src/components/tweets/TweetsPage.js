import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getLatestTweets } from '../../api/tweets';
import Layout from '../layout';
import Tweet from './Tweet';
import { Button } from '../shared';

function TweetsPage() {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    getLatestTweets().then(setTweets);
    // const fetchGetLatestTweets = async () => {
    //   const tweets = await getLatestTweets();
    //   setTweets(tweets);
    // };
    // fetchGetLatestTweets();
    return () => {
      // cancel request
      console.log('cancel request');
    };
  }, []);

  const handleLikeCreate = (tweetId, like) => {
    // Add like to tweet
    setTweets(
      tweets.map(tweet => {
        if (tweet.id !== tweetId) {
          return tweet;
        }
        return {
          ...tweet,
          likes: [...tweet.likes, like],
        };
      })
    );
  };

  const handleLikeDelete = (tweetId, likeId) => {
    // Remove like in tweet
    setTweets(
      tweets.map(tweet => {
        if (tweet.id !== tweetId) {
          return tweet;
        }
        return {
          ...tweet,
          likes: tweet.likes.filter(like => like.id !== likeId),
        };
      })
    );
  };

  const renderContent = () => {
    if (!tweets) {
      return null;
    }

    if (!tweets.length) {
      return (
        <div style={{ textAlign: 'center' }}>
          <p>Be the first twitter!</p>
          <Button as={Link} to="/tweet" $primary>
            Tweet
          </Button>
        </div>
      );
    }

    return tweets.map(tweet => (
      <Tweet
        key={tweet.id}
        {...tweet}
        onLikeCreate={handleLikeCreate}
        onLikeDelete={handleLikeDelete}
      />
    ));
  };

  return (
    <Layout title="What's going on...">
      <div className="tweetsPage">{renderContent()}</div>
    </Layout>
  );
}

export default TweetsPage;
