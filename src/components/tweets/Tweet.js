import React from 'react';
import T from 'prop-types';
import { useHistory } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import LikeButton from './LikeButton';
import Photo from '../shared/Photo';
import defaultPhoto from '../../assets/default_profile.png';
import { useAuthContext } from '../auth/context';
import { createLike, deleteLike } from '../../api/tweets';

import './Tweet.css';

const Tweet = ({
  id,
  content,
  createdAt,
  user,
  likes,
  onLikeCreate,
  onLikeDelete,
}) => {
  const history = useHistory();
  const { loggedUserId } = useAuthContext();

  const likeFromLoggedUser = likes.find(like => like.userId === loggedUserId);

  const handleClick = () => history.push(`/tweet/${id}`);

  const handleLikeClick = ev => {
    ev.stopPropagation();
    if (!loggedUserId) {
      return history.push('/login');
    }
    if (likeFromLoggedUser) {
      // Delete like
      return deleteLike(likeFromLoggedUser.id).then(() =>
        onLikeDelete(id, likeFromLoggedUser.id)
      );
    }
    // Create like in tweet
    createLike(id).then(like => onLikeCreate(id, like));
  };

  return (
    <article className="tweet bordered" onClick={handleClick}>
      <div className="left">
        <Photo src={defaultPhoto} className="tweet-photo" />
      </div>
      <div className="right">
        <div className="tweet-header">
          <span className="tweet-name">{user.name}</span>
          <span className="tweet-username">{user.username}</span>
          <span className="tweet-separator">·</span>
          <time dateTime={createdAt}>
            {formatDistanceToNow(new Date(createdAt))}
          </time>
        </div>
        <div>
          {content}
          <div className="tweet-actions">
            <LikeButton
              isActive={!!likeFromLoggedUser}
              onClick={handleLikeClick}
            >
              {likes.length || null}
            </LikeButton>
          </div>
        </div>
      </div>
    </article>
  );
};

Tweet.propTypes = {
  user: T.shape({ name: T.string.isRequired, username: T.string.isRequired })
    .isRequired,
  createdAt: T.string.isRequired,
  content: T.string,
  likes: T.arrayOf(T.shape({ userId: T.string.isRequired }).isRequired)
    .isRequired,
  onLikeCreate: T.func.isRequired,
  onLikeDelete: T.func.isRequired,
};

Tweet.defaultProps = {
  content: 'Nothing here!',
};

export default Tweet;
