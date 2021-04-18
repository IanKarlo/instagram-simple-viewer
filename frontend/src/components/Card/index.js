import { BlockOutlined, VideoCameraOutlined, InstagramOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import './index.css';

const Card = ({src, photos, setData, type, video, caption, timestamp, permalink}) => {
  
  function handleClick() {
    if(type === 'VIDEO') {
      setData({
        type,
        media_url: video,
        caption,
        timestamp,
        visible: true
      })
    } else if(type === 'CAROUSEL_ALBUM') {
      setData({
        type,
        photos,
        caption,
        timestamp,
        visible: true
      })
    } else {
      setData({
        type,
        media_url: src,
        caption,
        timestamp,
        visible: true
      })
    }
  }

  function getTime(timestamp) {
    const time = new Date(timestamp);
    const now = new Date();
    const timePass = now.getTime() - time.getTime();
    let days = Math.ceil(timePass / (1000 * 60 * 60 * 24));
    if(days > 7) {
      if(days > 30) {
        if(days > 365) {
          let years = 0;
          while(days > 365) {
            days -= 365;
            years++;
          }
          return `${years} ano${years > 1 ? 's' : ''} atras`;
        }
        let months = 0;
        while(days > 30) {
          days -= 30;
          months++;
        }
        return `${months} mes${months > 1 ? 'es' : ''} atras`;
      }
      let weeks = 0;
        while(days > 7) {
          days -= 7;
          weeks++;
        }
        return `${weeks} semana${weeks > 1 ? 's' : ''} atras`;
    }
    return `${days} dia${days > 1 ? 's' : ''}`;
  }
  
  return(
    <div class="card-wrapper">
      <div className="card" onClick={handleClick}>
        <img src={src} alt="media_photo"/>
        {type === "CAROUSEL_ALBUM" && (
        <div className="more-photos">
          <BlockOutlined />
        </div>)}
        {type === "VIDEO" && (
        <div className="more-photos">
          <VideoCameraOutlined />
        </div>)}
        <div className="shadow">
        </div>
      </div>
      <div className="see-instagram">
        <Tooltip placement="left" title={'Ver no instagram'}>
          <a className="instagram-tooltip" href={permalink} target="_blank" rel="noreferrer" >
            <InstagramOutlined />
          </a>
        </Tooltip>
        <p>{getTime(timestamp)}</p>
      </div>
    </div>
  )
}

export default Card;