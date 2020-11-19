import React, { useState, useEffect } from 'react';

import { getLatestTweets } from '../../api/tweets';
import Layout from '../layout';
import Tweet from './Tweet';

function TweetsPage({ history }) {
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

  const renderContent = () => {
    if (!tweets) {
      return null;
    }
    return tweets.map(tweet => (
      <Tweet key={tweet.id} {...tweet} history={history} />
    ));
  };

  return (
    <Layout title="What's going on...">
      <div className="tweetsPage">{renderContent()}</div>
    </Layout>
  );
}

export default TweetsPage;
