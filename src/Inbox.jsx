import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faPhoneVolume, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Inbox = () => {
  const {
    data: calls,
    error,
    isValidating,
  } = useSWR('https://aircall-api.onrender.com/activities', fetcher);

  const handlePatchAll = async (calls) => {
    try {
      const updatePromises = calls.map(call => {
        const updatedData = { is_archived: true };
        return fetch(`https://aircall-api.onrender.com/activities/${call.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        });
      });
      await Promise.all(updatePromises);
      mutate('https://aircall-api.onrender.com/activities');
      console.log('All records updated successfully');
    } catch (error) {
      console.error('Error updating records:', error);
    }
  };

  const handlePatchRecord = async (id) => {
    try {
      const updatedData = { is_archived: true };
      await axios.patch(`https://aircall-api.onrender.com/activities/${id}`, updatedData, {
        headers: { 'Content-Type': 'application/json' }
      });
      mutate('https://aircall-api.onrender.com/activities');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      <div className='archive-calls' onClick={() => handlePatchAll(calls)}>
        <div className='call-type'>
          <FontAwesomeIcon icon={faInbox}/><span>Archive all calls</span>
        </div>
      </div>

      <div className='inbox'>
        {calls &&
          calls.map((call, index) => {
            if (call.is_archived == false) {
              return <div key={index}>
                <p className='call-date'>
                  {new Date(call.created_at).toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric'}).replace(/,/g, '').replace(/(\s)/, ", ")}
                </p>

                <div 
                  className='call-summary' 
                  key={index}
                  onClick={() => handlePatchRecord(call.id)}
                >
                  <div className='call-type'>
                      { call.call_type === 'answered' ? <FontAwesomeIcon icon={faPhoneVolume} style={{color: "#34b31d"}}/> : <FontAwesomeIcon icon={faPhoneSlash} style={{color: "#fc5624"}}/> }
                  </div>

                  <div>
                      <p>{ call.from }</p>
                      <p className='call-to'>tried to call on { call.to }</p>
                  </div>

                  <p className='call-time'>
                    {new Date(call.created_at).toLocaleTimeString('en-US',{timeZone:'EST',hour12:true,hour:'numeric',minute:'numeric'})}
                    <span></span>
                  </p>
                </div>
              </div>
            }
          })}
      </div>
    </div>
  );
};

export default Inbox;