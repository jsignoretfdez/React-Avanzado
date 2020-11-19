import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getLatestTweets } from '../../api/tweets';
import Layout from '../layout';
import Tweet from './Tweet';

function TweetsPage() {
  const [tweets, setTweets] = useState(null);
  const history = useHistory();

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
