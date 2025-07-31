const NotFound404 = () => {
  return (
    <div className='d-flex flex-column vh-100 w-100' style={{backgroundColor: '#000000'}}>
      <div className='text-white' style={{fontSize: '36rem', fontWeight: 600}}>
        404
      </div>
      <div className='text-white fs-1'>
        Whatever you're looking for, it doesn't exists.
      </div>
    </div>
  );
}

export default NotFound404;
