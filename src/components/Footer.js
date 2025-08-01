import '../css/Footer.css';

const Footer = () => {
  return ([
    <p key={0} className='d-flex flex-row justify-content-center align-items-center w-100 text-white'>
      @dmytro_terekhov, 2025
    </p>,
    <div key={1} className='position-relative'>
      <div className='h-0 d-flex justify-content-center'>
        <img id='footer-img' className='position-relative z-n1' src={'./images/apps_background.png'} alt='footer' />
      </div>
    </div>
  ]);
};

export default Footer;