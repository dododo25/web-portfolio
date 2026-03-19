import favicon from '../public/favicon.ico';
import logo192 from '../public/logo192.png';

const usePreload = () => {
  document.head.getElementsByTagName('title')[0].innerHTML = 'dmytro.terekhov';

  document.head.querySelector('link[rel="icon"]').href = favicon;
  document.head.querySelector('link[rel="apple-touch-icon"]').href = logo192;
};

export { usePreload };