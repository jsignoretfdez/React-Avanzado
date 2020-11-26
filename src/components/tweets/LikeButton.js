import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as IconUnliked } from '../../assets/like.svg';
import { ReactComponent as IconLiked } from '../../assets/like_filled.svg';
import './LikeButton.css';

const LikeButton = ({ className, children, isActive, onClick }) => {
  const Icon = isActive ? IconLiked : IconUnliked;

  return (
    <div
      className={classNames('likeButton', className, {
        'likeButton--active': isActive,
      })}
      onClick={onClick}
    >
      <span className="likeButton-icon">
        <Icon width="20" height="20" />
      </span>
      <span className="likeButton-label">{children}</span>
    </div>
  );
};

LikeButton.propTypes = {
  children: T.node,
  className: T.string,
  isActive: T.bool,
  onClick: T.func,
};

export default LikeButton;
