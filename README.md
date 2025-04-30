# Closet Outfit Builder App

## Author
 Tristan Jones

## Web site Description

This website allows users to create a virtual closet by uploading clothing items with details such as type, color, style, occasion, and an image.
Users can filter closet items using a dropdown-based filter modal and build complete outfits by selecting multiple items.
Outfits can be saved with a name and description and are stored in a DynamoDB database.
Users can view their saved outfits one at a time in a carousel format and click to view the full outfit in an expanded modal.

The application uses:
	•	Frontend: Next.js (React), Tailwind CSS, Framer Motion
	•	Backend: AWS Lambda + API Gateway + DynamoDB (Serverless)
	•	Features: Closet Uploading, Filtering, Outfit Building, Saving, and Viewing

## How to View
1.	Clone the repository:
    git clone https://github.com/YOUR_USERNAME/closet-app.git
    cd closet-app   
2. Install project Dependencies
    npm install
3. Start the server
    npm run dev


## Resources

- https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html
- https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html
- https://uiverse.io/ (took inspiration with some UI elements)
- https://www.youtube.com/watch?v=bXf_UdyDzSA
- https://www.geeksforgeeks.org/node-js-crypto-randomuuid-function/
