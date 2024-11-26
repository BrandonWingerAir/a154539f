import useSWR from 'swr';

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
    <div>
      {calls &&
        calls.map((call, index) => (
          <div className='call-summary' key={index}>
            <div className='call-type'>
                { call.call_type === 'answered' ? '📞' : '❌' }
            </div>

            <div>
                <p className='call-to'>{ call.to }</p>
                <p>tried to call on { call.from }</p>
            </div>

            <p className='call-time'>Time</p>
          </div>
        ))}
    </div>
  );
};

export default Data;
