import { useUser } from '../../providers/user';

import { Carousel } from 'antd';
import { CloseOutlined } from '@ant-design/icons'

import './index.css'

const Modal = ({data, setData}) => {

  const { user } = useUser();
  
  
  function handleClick(e) {
    if(!e.target.className.split) return;
    const classes = e.target.className.split(' ');
    if(classes.includes('modal-content')) {
      setData({...data, visible: false})
    }
  }
  
  if(!data.visible) return null;

  if(data.type === 'CAROUSEL_ALBUM') {
    return (
      <>
        <div className="modal-wrapper" onClick={handleClick}>
        </div>
        <div className="modal-content" onClick={handleClick}>
        <div className="content-wrapper">
            <div className="img-wrapper">
            <div className="close-btn" onClick={() => setData({...data, visible: false})}>
              <CloseOutlined />
            </div>
            <Carousel dotPosition="top" style={{width: '100%'}}>
              {data.photos.data.map((e, i) => {
                if(e.media_type === 'IMAGE') {
                  return (
                  <div key={i}>
                    <img src={e.media_url} alt="media_photo"/>
                  </div>
                  )
                }
                return (
                  <div key={i}>
                    <video controls src={e.media_url} type="video/mp4">
                      Seu navegador não suporta o video
                    </video>
                  </div>
                )
              })}
            </Carousel>
            </div>
            <div className="comment-wrapper">
              <div>
                <img src={user.profile_pic_url} alt="profile"/>
                <p><strong>{user.username}</strong>
                {data.caption}</p>
              </div>
            </div>
          </div> 
        </div>
      </>
    )
  }

  if(data.type === 'IMAGE') {
    return (
      <>
        <div className="modal-wrapper">
        </div>
        <div className="modal-content" onClick={handleClick}>
          <div className="content-wrapper">
            <div className="img-wrapper">
            <div className="close-btn" onClick={() => setData({...data, visible: false})}>
              <CloseOutlined />
            </div>
              <img src={data.media_url} alt="media_photo"/>
            </div>
            <div className="comment-wrapper">
              <div>
                <img src={user.profile_pic_url} alt="profile"/>
                <p><strong>{user.username}</strong>
                {data.caption}</p>
              </div>
            </div>
          </div>    
        </div>
      </>
    )
  }

  return (
    <>
        <div className="modal-wrapper">
        </div>
        <div className="modal-content" onClick={handleClick}>
          <div className="content-wrapper">
            <div className="img-wrapper">
            <div className="close-btn" onClick={() => setData({...data, visible: false})}>
              <CloseOutlined />
            </div>
              <video controls src={data.media_url} type="video/mp4">
                Seu navegador não suporta o video
              </video>
            </div>
            <div className="comment-wrapper">
              <div>
                <img src={user.profile_pic_url} alt="profile"/>
                <p><strong>{user.username}</strong>
                {data.caption}</p>
              </div>
            </div>
          </div>    
        </div>
      </>
  )
}

export default Modal;