# Instagram Simple Viewer frontend
***
#### *About Application*
 > 
The purpose of this application is to display the media of an Instagram user through a token received using the Instagram Basic Display API. This application use ReactJS in the frontend and NodeJS (with Express) in the backend.:
 [![](https://res.cloudinary.com/practicaldev/image/fetch/s--UOk8LAxx--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/bn9e282g64rfnk0wtxhl.jpg)](https://developers.facebook.com/docs/instagram-basic-display-api/)
  
# Installing and running application
***
 - #### Download repository
   You need to download/clone the repository on your machine. You can use the following git command for it:

        git clone https://github.com/IanKarlo/instagram-simple-viewer.git
 - #### Install front-end dependencies
   To install front-end dependencies, go to repository directory in your machine and you can use the following command:

        cd frontend
        npm install
        or
        yarn install
 - #### Install back-end dependencies
   To install back-end dependencies, inside the repository directory in your machine use the followings commands:

        cd backend
        npm install
        or
        yarn install
 - #### Run front-end
   First of all you need to configure the .env file, change the name of .env.example file to .env and put the url to your backend in REACT_APP_API_URL enviromental variable. Then in your terminal in the repository directory root run the following commands:

        cd frontend
        npm start
        or
        yarn start
 - #### Run back-end
   To run backend, in the repository directory root run the following commands:

        cd backend
        npm start
        or
        yarn start

# Backend routes
***
The backend of project had 3 routes:
- GET API/user-details?userToken
In this route, the backend recieves the token from Instagram Basic Display API and get the user data. This route seems like an authentication route for this application, by recieving a token and serve the user basic data.
- GET API/user-media?userToken
In this route, the backend recieves the token from Instagram Basic Display API and get the user media. In this case, this route just serve the first 25 media from the user, but if it had more, is send to client the pagination data, that consists in a link to get more media.
- GET API/page-media?next&previous
In this route, the backend recieves if is next or previous page of media to get. It made a verification and made a request do Instagram API. If next or previous is not provided, it returns an error.

# Frontend screens
***
- Token authentication screen
In this screen the user can put the Instagram API token in the input to enter in the application.
- Media screen
In this screen the media of user is showed. The application had a pagination system, that shows only 25 media per page, and when the user can navigate through pages a button going to next/previous page is showed.