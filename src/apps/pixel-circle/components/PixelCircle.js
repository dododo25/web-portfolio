import { useRef, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import * as htmlToImage from 'html-to-image';

import CircleCanvas from './CircleCanvas';
import InputNumber from './InputNumber';

import '../css/PixelCircle.css';

const PixelCircleInner = () => {
  const onBind = value => {
    setBind(value);
    setCookie('bind', value, {path: '/'});
  };

  const [cookies, setCookie, ] = useCookies(['width', 'height', 'thickWalls', 'fill', 'bind']);

  const [size, setSize]             = useState({width: cookies['width'] || 32, height: cookies['height'] || 32});
  const [thickWalls, setThickWalls] = useState(cookies['thickWalls'] || true);
  const [fill, setFill]             = useState(cookies['fill'] || false);
  const [bind, setBind]             = useState(cookies['bind'] || false);

  const svgRef = useRef(null);

  const onSaveAsPNGButtonClicked = () => {
    const svgNode = svgRef.current;

    htmlToImage.toBlob(svgNode)
      .then(blob => {
        const filename = `circle_${size.width}x${size.height}${(!fill && thickWalls) ? '_thick' : ''}${fill ? '_filled' : ''}.png`;

        if (window.saveAs) {
          window.saveAs(blob, filename);
        } else {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = filename;
          link.href = url;
          link.click();
          }
      });
  };

  const onSaveAsSVGButtonClicked = () => {
    const svgNode = svgRef.current;

    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(svgNode.parentNode.innerHTML)}`;
    link.download = `circle_${size.width}x${size.height}${(!fill && thickWalls) ? '_thick' : ''}${fill ? '_filled' : ''}.svg`;
    link.click();
  };

  return (
    <div className='PixelCircle d-flex vw-100 vh-100'>
      <div className='side d-flex flex-column px-3 py-4'>
        <h1 className='mx-auto fw-semibold'>Pixel Circle Generator</h1>
        <hr className='col-4 mx-auto my-3 color-primary' />
        <div className='d-flex flex-row justify-content-center my-3'>
          <div className='col-3'>
            <label htmlFor='widthInput' className='fs-6 text-primary'>
              Width
            </label>
            <InputNumber id='widthInput' className={size.height < 1 ? 'border-danger': ''} name='widthInput' min={1} value={size.width} onChange={v => {
              const newSize = {
                width: v * 1,
                height: bind ? v * 1 : size.height
              };

              setSize(newSize);

              setCookie('width',  newSize.width,  {path: '/'});
              setCookie('height', newSize.height, {path: '/'});
            }} />
          </div>
          <div className='mx-1 mt-4'>
            <button onClick={() => onBind(true)} className={`btn btn-sm p-0 fs-4${bind ? ' collapse' : ''}`} style={{filter: 'grayscale(100%) contrast(30%)'}}>🔓</button>
            <button onClick={() => onBind(false)} className={`btn btn-sm p-0 fs-4${bind ? '': ' collapse'}`} style={{filter: 'grayscale(100%) contrast(30%)'}}>🔒</button>
          </div>
          <div className='col-3'>
            <label htmlFor='heightInput' className='fs-6 text-primary'>
              Height
            </label>
            <InputNumber id='heightInput' className={size.height < 1 ? 'border-danger': ''} name='heightInput' min={1} value={size.height} onChange={v => {
              const newSize = {
                width: bind ? v : size.width,
                height: v * 1
              };

              setSize(newSize);

              setCookie('width',  newSize.width,  {path: '/'});
              setCookie('height', newSize.height, {path: '/'});
            }} />
          </div>
        </div>
        <div className='d-flex flex-row mx-auto my-3'>
          <div className='form-check fs-4'>
            <input id='fillCheckbox' className='form-check-input' type='checkbox' name='fillCheckbox' checked={fill} onChange={e => {
              setFill(e.target.checked);
              setCookie('fill', e.target.checked, {path: '/'});
            }} />
            <label className='form-check-label text-primary fw-semibold' htmlFor='fillCheckbox'>
              Fill
            </label>
          </div>
          <div className='mx-3'></div>
          <div className='form-check fs-4'>
            <input id='thickWallsCheckbox' className='form-check-input' type='checkbox' name='thickWallsCheckbox' checked={thickWalls} disabled={fill} onChange={e => {
              setThickWalls(e.target.checked);
              setCookie('thickWalls', e.target.checked, {path: '/'});
            }} />
            <label className='form-check-label text-primary fw-semibold' htmlFor='thickWallsCheckbox'>
              Thick walls
            </label>
          </div>
        </div>
        <hr className='col-4 mx-auto my-3' />
        <div className='d-flex flex-row mx-auto'>
          <button className='btn btn-outline-secondary fs-4 fw-semibold' onClick={onSaveAsPNGButtonClicked}>
            Save as png
            </button>
            <div className='mx-2'></div>
            <button className='btn btn-outline-secondary fs-4 fw-semibold' onClick={onSaveAsSVGButtonClicked}>
              Save as svg
            </button>
          </div>
          <div className='my-auto'></div>
          <div className='mx-auto fw-semibold'>
            <span className='text-primary'>Made by </span><a href='https://dmytroterekhov.site/'>Dmytro Terekhov</a><span className='text-primary'>, 2026</span>
          </div>
        </div>
      <CircleCanvas svgRef={svgRef} width={size.width} height={size.height} fill={fill} thickWalls={thickWalls} />
    </div>
  );
}

const PixelCircle = () => {
  return (
    <CookiesProvider>
      <PixelCircleInner />
    </CookiesProvider>
  );
};

export default PixelCircle;
