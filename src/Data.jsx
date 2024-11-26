import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Data = () => {
  const {
    data: calls,
    error,
    isValidating,
  } = useSWR('https://aircall-api.onrender.com/activities', fetcher);

  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div className='inbox'>
      {calls &&
        calls.map((call, index) => (
          <div>
            <p className='call-date'>
              {new Date(call.created_at).toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric'}).replace(/,/g, '').replace(/(\s)/, ", ")}
            </p>

            <div className='call-summary' key={index}>
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
        ))}
    </div>
  );
};

export default Data;
