

const Loading = () => {
  return (
   
    <div className="flex-col space-y-4 p-8 pt-6">
     <div className='skeleton-text skeleton' style={{ height: '.8rem', width: '20%' }}></div>
     <div className='skeleton-text skeleton' style={{ height: '.8rem', width: '10%' }}></div>
    <div className="grid gap-4 grid-cols-3">
    <div className="skeleton space-y-4 py-4 pl-2">
      <div className="skeleton-text" style={{ height: '.6rem', width: '80%' }}></div>
      <div className="skeleton-text" style={{ height: '.5rem', width: '40%' }}></div>
      </div>
      <div className="skeleton space-y-4 py-4 pl-2">
      <div className="skeleton-text" style={{ height: '.6rem', width: '80%' }}></div>
      <div className="skeleton-text" style={{ height: '.5rem', width: '40%' }}></div>
      </div>
      <div className="skeleton space-y-4 py-4 pl-2">
      <div className="skeleton-text" style={{ height: '.6rem', width: '80%' }}></div>
      <div className="skeleton-text" style={{ height: '.5rem', width: '40%' }}></div>
      </div>
    </div>
    <div className="skeleton" style={{ height: '300px', width: '100%' }}></div>
  </div>
  );
};

export default Loading;
