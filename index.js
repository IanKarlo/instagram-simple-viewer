const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const axios = require('axios');

const API_URL = 'https://graph.instagram.com';
const INSTAGRAM_URL = "https://www.instagram.com";

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  return res.send("Ok!");
});

app.get('/user-details', async (req, res) => {
  try {
    const { userToken } = req.query
    
    const data = await axios.get(`${API_URL}/me`, {
      params: {
        fields: 'id,username,account_type,media_count',
        access_token: userToken,
      }
    });
  
    console.log(data.data);
    
    const otherData = await axios.get(`${INSTAGRAM_URL}/${data.data.username}/?__a=1`);
    
    console.log(otherData.data);
    
    const {
      username,
      id,
      media_count,
      account_type
    } = data.data;

    const {
      biography,
      profile_pic_url,
      full_name
    } = otherData.data.graphql.user;

    return res.send({
      username,
      id,
      media_count,
      account_type,
      biography,
      profile_pic_url,
      full_name
    });
  } catch(err) {
    console.log(err.message, '/user-details');
    res.status(400).send("Error");
  }
});

app.get('/user-media', async (req, res) => {
  try {
    const { userToken } = req.query
    
    const data = await axios.get(`${API_URL}/me/media`, {
      params: {
        fields: 'username,id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_url, media_type}',
        access_token: userToken,
      }
    });

    const newData = {
      next: data.data.paging.next ? data.data.paging.next : null, 
      previous: data.data.paging.previous ? data.data.paging.previous : null,
      media: data.data.data
    }

    return res.send(newData);
  } catch(err) {
    console.log(err.message, '/user-media');
    res.status(400).send("Error");
  }
});

app.get('/page-media', async (req, res) => {
  try {
    const { next, previous } = req.query

    if(next !== '') {

      const data = await axios.get(next+'&fields=username,id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_url, media_type}');
      
      const newData = {
        next: data.data.paging.next ? data.data.paging.next : null, 
        previous: data.data.paging.previous ? data.data.paging.previous : null,
        media: data.data.data
      }
  
      return res.send(newData);

    } else if(previous !== '') {

      const data = await axios.get(previous+'&fields=username,id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_url, media_type}');
      
      const newData = {
        next: data.data.paging.next ? data.data.paging.next : null, 
        previous: data.data.paging.previous ? data.data.paging.previous : null,
        media: data.data.data
      }
  
      return res.send(newData);
    } 

    return res.status(400).send("Error");

  } catch(err) {
    console.log(err.message);
    res.status(400).send("Error");
  }
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server runing on port ${process.env.PORT || 8080}`);
})
