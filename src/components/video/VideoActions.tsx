'use client';

import { useState } from 'react';

interface VideoActionsProps {
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export default function VideoActions({ likes, dislikes, isLiked: initialIsLiked, isDisliked: initialIsDisliked }: VideoActionsProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked || false);
  const [isDisliked, setIsDisliked] = useState(initialIsDisliked || false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentDislikes, setCurrentDislikes] = useState(dislikes);

  const handleLike = () => {
    if (isLiked) {
      setCurrentLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setCurrentLikes(prev => prev + 1);
      setIsLiked(true);
      
      if (isDisliked) {
        setCurrentDislikes(prev => prev - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setCurrentDislikes(prev => prev - 1);
      setIsDisliked(false);
    } else {
      setCurrentDislikes(prev => prev + 1);
      setIsDisliked(true);
      
      if (isLiked) {
        setCurrentLikes(prev => prev - 1);
        setIsLiked(false);
      }
    }
  };

  return (
    <div className="action-buttons">
      <button 
        className={`btn-action ${isLiked ? 'active' : ''}`} 
        onClick={handleLike}
      >
        <i className="far fa-thumbs-up"></i>
        <span>{currentLikes.toLocaleString()}</span>
      </button>
      
      <button 
        className={`btn-action ${isDisliked ? 'active' : ''}`} 
        onClick={handleDislike}
      >
        <i className="far fa-thumbs-down"></i>
        <span>{currentDislikes.toLocaleString()}</span>
      </button>
      
      <button className="btn-action">
        <i className="far fa-share-square"></i>
        <span>Compartir</span>
      </button>
      
      <button className="btn-action">
        <i className="far fa-bookmark"></i>
        <span>Guardar</span>
      </button>
    </div>
  );
}