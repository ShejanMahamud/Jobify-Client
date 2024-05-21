import moment from 'moment';
import React from 'react';

const Expire = ({ date }) => {
  const currentDate = moment().format("MMMM D, YYYY");
  const jobExpirationDate = moment(date, "MMMM D, YYYY"); 

  const isExpired = jobExpirationDate.isBefore(currentDate);
  

  return (
    <div>
      {isExpired && (
        <span className='text-red-500 text-xs'>Job Date Expired</span>
      )}
    </div>
  );
};

export default Expire;
