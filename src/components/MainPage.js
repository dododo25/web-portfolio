import '../css/MainPage.css';

import Page from './Page';

const MainPage = () => {
  const content = (
    <div className='d-flex flex-column h-100'>
      <div className='d-flex flex-column pb-0 mx-auto my-auto'>
        <p id='title'>Dmytro Terekhov</p>
        <div className='d-flex flex-row justify-content-end align-items-center fs-5 w-100'>
          <a href='https://github.com/dododo25' target='_blank' rel='noreferrer' className='link d-flex flex-row align-items-center mx-2 text-white'>
            <p className='m-0'><i className='fa fa-brands fa-github fs-2 me-2'></i>GitHub</p>
          </a>
          <a href='https://www.linkedin.com/in/dmytro-terekhov-ab2872106' target='_blank' rel='noreferrer' className='link d-flex flex-row align-items-center mx-2 text-white'>
            <p className='m-0'><i className='fa fa-brands fa-linkedin fs-2 me-2'></i>LinkedIn</p>
          </a>
          <a href='mailto:dmytro.terekhov@outlook.com' target='_blank' rel='noreferrer' className='link d-flex flex-row align-items-center mx-2 text-white'>
            <p className='m-0'><i className='fa fa-envelope fs-2 me-2'></i>Outlook</p>
          </a>
        </div>
      </div>
    </div>
  );

  return (<Page content={content} />);
}

export default MainPage;
