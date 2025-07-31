import Card from './Card';
import data from '../data/apps.json';
import Page from './Page';

const Apps = () => {
  const cards = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    cards.push(<Card key={i} item={item}  />);

    if (i < data.length - 1) {
      cards.push(<div key={i + data.length} className='py-5'></div>);
    } else {
      cards.push(<div key={i + data.length} className='py-3'></div>);
    }
  }

  let content;

  if (data.length === 0) {
    content = (
      <div className='d-flex flex-column h-100'>
        <h1 className='mx-auto mt-2 mb-4'>Apps</h1>
        <div className='d-flex pb-0 mx-auto my-auto' style={{fontSize: '8rem'}}>
          Coding soon :)
        </div>
      </div>
    );
  } else {
    content = (
      <div className='d-flex flex-column'>
        <h1 className='mx-auto mt-2 mb-4'>Apps</h1>
        <div className='pb-0'>
          {cards}
        </div>
      </div>
    );
  }

  return (<Page content={content} />);
}

export default Apps;
