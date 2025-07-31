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

    const pathname = document.location.pathname;

    if (pathname === '/about') {
      headerElem.children[0].firstChild.className = 'nav-link active';
    } else if (pathname === '/apps') {
      headerElem.children[1].firstChild.className = 'nav-link active';
    } else if (pathname === '/games') {
      headerElem.children[2].firstChild.className = 'nav-link active';
    } else if (pathname === '/blog') {
      headerElem.children[3].firstChild.className = 'nav-link active';
    }

    window.addEventListener('scroll', () => {
      mainContentElem.firstChild.style.bottom = `${window.scrollY}px`;

      if (window.scrollY > 0) {
        navbarElem.style.animation = '0.2s ease-in forwards navbar-box-shadow-anim';
      } else {
        navbarElem.style.animation = '0.2s ease-in forwards reverse navbar-box-shadow-anim';
      }
    });

    window.addEventListener('resize', () => {
        const offsetHeight = mainContentElem.offsetHeight;
        const screenHeight = window.innerHeight;

        if (offsetHeight < screenHeight) {
          rootElem.style.height        = `${screenHeight}px`;
          mainContentElem.style.height = `calc(${screenHeight}px - 3.6rem)`;
        } else {
          rootElem.style.height        = `calc(3.6rem + ${offsetHeight}px)`;
          mainContentElem.style.height = undefined;
        }
    });

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        const offsetHeight = mainContentElem.offsetHeight;
        const screenHeight = window.innerHeight;

        if (offsetHeight < screenHeight) {
          rootElem.style.height        = `${screenHeight}px`;
          mainContentElem.style.height = `calc(${screenHeight}px - 3.6rem)`;
        } else {
          rootElem.style.height        = `calc(3.6rem + ${offsetHeight}px)`;
          mainContentElem.style.height = undefined;
        }
      });
    });

    resizeObserver.observe(mainContentElem);
  }, []);

  return ([
    <Background />,
    <div className='position-relative w-100 h-100' style={{bottom: '100%'}}>
      <nav ref={navbarRef} className='navbar navbar-expand-lg fixed-top bg-dark' data-bs-theme='dark'>
        <div className='container-fluid w-auto'>
          <a className='nav-link' href='/'>
            <span className='navbar-brand'>dmytro.terekhov</span>
          </a>
          <div className='collapse navbar-collapse' id='mainNavbar'>
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
