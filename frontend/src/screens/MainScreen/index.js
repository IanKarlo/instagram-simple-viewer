import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import { useUser } from '../../providers/user';
import { getMedia, getPaginatedMedia } from '../../providers/token';

import Card from '../../components/Card';
import Modal from '../../components/Modal';
import { Button } from 'antd';

import './index.css'


const MainScreen = () => {

  const { user, setUser } = useUser();
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [media, setMedia] = useState([]);
  const [modalData, setModalData] = useState({visible: false});
  const [pagination, setPagination] = useState({});


  useEffect(() => {
    if(!user) {
      setRedirect(true);
      setLoadingScreen(false);
    }
    else {
      getMedia(user.token).then(r => {
        const media = r.data.media;
        setPagination({next: r.data.next, previous: r.data.previous});
        const photos = media.map((e, i) => {
          if(e.media_type !== 'VIDEO') {
            return <Card setData={setModalData} permalink={e.permalink} key={i} src={e.media_url} type={e.media_type} photos={e.children} caption={e.caption} timestamp={e.timestamp}/>
          }
          return <Card key={i} setData={setModalData} permalink={e.permalink} src={e.thumbnail_url} type={e.media_type} caption={e.caption} timestamp={e.timestamp} video={e.media_url}/>
        });
        setMedia(photos);
        setLoadingScreen(false);
      });
    }
  },[user]);

  if(loadingScreen) {
    return (
      <div className="loader-wrapper">
        <div className="loader">
        </div>
      </div>
    )
  }

  if(redirect) {
    return (
      <Redirect to="/"/>
    )
  }

  function getPaginatedData(r) {
    const media = r.data.media;
    setPagination({next: r.data.next, previous: r.data.previous})
    const photos = media.map((e, i) => {
      if(e.media_type !== 'VIDEO') {
        return <Card setData={setModalData} permalink={e.permalink} key={i} src={e.media_url} type={e.media_type} photos={e.children} caption={e.caption} timestamp={e.timestamp}/>
      }
      return <Card key={i} setData={setModalData} permalink={e.permalink} src={e.thumbnail_url} type={e.media_type} caption={e.caption} timestamp={e.timestamp} video={e.media_url}/>
    });
    setMedia(photos);
    setLoadingScreen(false);
  }

  return (
    <div className="main">
      <div className="back-btn">
        <Button onClick={() => {
          setLoadingScreen(true);
          setUser(null);
          }}>
          Voltar
        </Button>
      </div>
      <div className="header">
        <div>
          <h1><a target="_blank" href={`https://instagram.com/${user.username}`}  rel="noreferrer">@{user.username}</a></h1>
          <h3>{user.media_count} publicações</h3>
        </div>
      </div>
      <div className="media-container">
        {media}
      </div>
      <div className="pagination-container">
        {pagination.previous && <Button onClick={() => {
          setLoadingScreen(true);
          getPaginatedMedia({previous: pagination.previous}).then(getPaginatedData)
        }}>
          Anterior
        </Button>}
        {pagination.next && <Button type="primary" onClick={() => {
          setLoadingScreen(true);
          getPaginatedMedia({next: pagination.next}).then(getPaginatedData)
        }}>
          Proximo
        </Button>}
      </div>
      <Modal data={modalData} setData={setModalData}/>
    </div>
  )
};

export default MainScreen;