const NotFound404 = () => {
  return (
    <div className='d-flex flex-column vh-100 w-100 justify-content-center align-items-center' style={{backgroundColor: '#000000'}}>
      <div className='text-white fw-bold lh-1' style={{fontSize: '24rem'}}>
        404
      </div>
      <div className='text-white fs-1 mb-3'>
        Whatever you're looking for, it doesn't exists.
      </div>
      <div>
        <a href='/' className='text-white fs-1'>Back to main page</a>
      </div>
    </div>
  );
}

export default NotFound404;
