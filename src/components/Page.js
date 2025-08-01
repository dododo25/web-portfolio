import { useEffect, useRef } from 'react';

import Background from './Background';
import Footer from './Footer';

const Page = props => {
  const headerRef      = useRef();
  const mainContentRef = useRef();
  const navbarRef      = useRef();

  useEffect(() => {
    const rootElem = document.getElementById('root');

    const headerElem      = headerRef.current;
    const mainContentElem = mainContentRef.current;
    const navbarElem      = navbarRef.current;

    const frameFunction = () => {
      mainContentElem.style.height = 0;
      mainContentElem.firstChild.style.cssText = 'height:fit-content !important';

      const offsetHeight = mainContentElem.firstChild.offsetHeight;
      const screenHeight = window.innerHeight;

      if (offsetHeight < screenHeight) {
        rootElem.style.height        = `${screenHeight}px`;
        mainContentElem.style.height = `calc(${screenHeight}px - 3.6rem)`;
      } else {
        rootElem.style.height        = `calc(3.6rem + ${offsetHeight}px)`;
        mainContentElem.style.height = `${offsetHeight}px`;
      }

      mainContentElem.firstChild.style.cssText = '';
    };

    const pathname = document.location.pathname;

    if (pathname.endsWith('/apps')) {
      headerElem.children[0].firstChild.className = 'nav-link active';
    } else if (pathname.endsWith('/games')) {
      headerElem.children[1].firstChild.className = 'nav-link active';
    } else if (pathname.endsWith('/blog')) {
      headerElem.children[2].firstChild.className = 'nav-link active';
    }

    window.addEventListener('scroll', () => {
      mainContentElem.firstChild.style.bottom = `${window.scrollY}px`;

      if (window.scrollY > 0) {
        navbarElem.style.animation = '0.2s ease-in forwards navbar-box-shadow-anim';
      } else {
        navbarElem.style.animation = '0.2s ease-in forwards reverse navbar-box-shadow-anim';
      }
    });

    window.addEventListener('resize', frameFunction);

    let resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(frameFunction);
    });

    resizeObserver.observe(mainContentElem);
  }, []);

  return ([
    <Background />,
    <div className='offcanvas offcanvas-start w-40 px-3' id='mainNavbar' tabindex='-1' data-bs-theme='dark'>
      <div class='offcanvas-header'>
        <h5 className='offcanvas-title'>dmytro.terekhov</h5>
        <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
      </div>
      <div class='offcanvas-body'>
        <ul ref={headerRef} className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link' href='/apps'>apps</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/games'>games</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/blog'>blog</a>
          </li>
        </ul>
      </div>
    </div>,
    <div className='position-absolute w-100 h-100 t-0' style={{top: 0}}>
      <nav ref={navbarRef} className='navbar navbar-expand-lg fixed-top bg-dark' data-bs-theme='dark'>
        <div className='container-fluid w-auto'>
          <div className='d-flex flex-row align-items-center'>
            <a className='nav-link' href='/'>
              <span className='navbar-brand'>dmytro.terekhov</span>
            </a>
            <button className='navbar-toggler' type='button' data-bs-toggle='offcanvas' data-bs-target='#mainNavbar' aria-controls='mainNavbar' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
          </div>
          <div className='collapse navbar-collapse'>
            <ul ref={headerRef} className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a className='nav-link' href='/apps'>apps</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/games'>games</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/blog'>blog</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div ref={mainContentRef} className='position-fixed overflow-hidden w-100' style={{marginTop: '3.6rem'}}>
        <div className='d-flex flex-column position-relative h-100'>
          <div className='container flex-grow-1 text-white'>
            {props.content}
          </div>
          <div style={{height: 100}} />
          <div className='d-flex flex-column flex-grow-0 flex-shrink-0'>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  ]);
}

export default Page;
