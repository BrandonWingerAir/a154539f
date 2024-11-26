import useSWR, { mutate } from 'swr';
import axios from 'axios';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Detail = () => {
  const {
    data: call,
    error,
    isValidating,
  } = useSWR('https://aircall-api.onrender.com/activities/' + window.location.href.substring(window.location.href.lastIndexOf('/') + 1), fetcher);

  const handlePatchRecord = async (id) => {
    try {
      const updatedData = { is_archived: true };
      await axios.patch(`https://aircall-api.onrender.com/activities/${call.id}`, updatedData, {
        headers: { 'Content-Type': 'application/json' }
      });
      mutate(`https://aircall-api.onrender.com/activities/${call.id}`);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div className='call-details'>
        <p>Direction: {call.direction}</p>
        <p>From: {call.from}</p>
        <p>To: {call.to}</p>
        <p>VIA: {call.via}</p>
        <p>Duration: {call.duration}</p>
        <p>Archived: {call.is_archived ? 'Yes' : 'No'}</p>
        <p>Status: {call.call_type}</p>

        <button className='archive-btn' onClick={() => handlePatchRecord(call.id)}>
            Archive
        </button>
    </div>
  )
}

export default Detail;