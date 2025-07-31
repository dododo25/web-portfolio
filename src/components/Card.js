import '../css/Card.css';

const Card = props => {
  const links = [];

  for (let link of props.item.links) {
    links.push(<a href={link.url} className='btn btn-outline-light'>{link.label}</a>);
  }

  return (
    <div className='app-card d-flex flex-column align-items-center'>
      <img className='mx-auto pb-2' src={props.item.src} alt={props.item.key + '_item_card'} />
      <div className='w-70 d-flex flex-column align-items-center'>
        <h3 className='text-center fs-3'>{props.item.title}</h3>
        <p className='text-center fs-5 text-justify'>{props.item.description}</p>
        <div className='d-flex flex-row gap-3'>
          {links}
        </div>
      </div>
    </div>
  );
}

export default Card;
