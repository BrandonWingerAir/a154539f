import React, { useState, useEffect, displayLocation } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Detail = () => {
  const {
    data: call,
    error,
    isValidating,
  } = useSWR('https://aircall-api.onrender.com/activities/' + window.location.href.substring(window.location.href.lastIndexOf('/') + 1), fetcher);

  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  const handlePatchRecord = async () => {
    try {
      let updatedData = {};
      
      if (!call.is_archived) {
        updatedData = { is_archived: true };
      } else {
        updatedData = { is_archived: false };
      }
      
      await axios.patch(`https://aircall-api.onrender.com/activities/${call.id}`, updatedData, {
        headers: { 'Content-Type': 'application/json' }
      });
      mutate(`https://aircall-api.onrender.com/activities/${call.id}`);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return // <div className="Loading">Loading...</div>;

  function Archived() {
    if (!call.is_archived) {
      return <button className='archive-btn' onClick={() => handlePatchRecord(call.id)}>Archive</button>
    } else {
      return <button className='archive-btn unarchive-btn' onClick={() => handlePatchRecord(call.id)}>Unarchive</button>
    }
  }

  return (
    <div 
      className={`call-details ${transitionStage}`}
      onAnimationEnd={() => { setTransitionStage("fadeIn"); }}
    >
        <p>Direction: {call.direction}</p>
        <p>From: {call.from}</p>
        <p>To: {call.to}</p>
        <p>VIA: {call.via}</p>
        <p>Duration: {call.duration}</p>
        <p>Archived: {call.is_archived ? 'Yes' : 'No'}</p>
        <p>Status: {call.call_type}</p>

        <Archived isArchived={call.is_archived}/>
    </div>
  )
}

export default Detail;