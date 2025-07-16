# Closet App
An app top make 2d outfits from images 

## Tech Description

### Frontend:
Frontend is built from the Next.js framework

### Backend
The backend API build as a REST api from the Nest.js framework. I am hosting the webpage on an EC2 instance and using RDS for a postgres database to hold the users, closet items, and outfits.An S3 bucket holds the images and a presigned url is sent to the backend to be stored in the closet item image.
