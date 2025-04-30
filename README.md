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

## Reflection

I really enjoyed working on this project. It was fun to turn an idea into an application. It got hard and had to use outside resources to figure out how to make sure I can upload images to the database. Haven't done much with AWS so looking back at the previous lab we did and reading some documentation for the AWS lambda helped me get my API going. One of my hardest parts was a CORS error. With all the tabs and defining parts of the route in different places, I got mixed up with what right HTTP method I was supposed to be calling for adding closet outfits. There is still more to this project that can be done to make it better but for now this project is done.
## Resources

- https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html
- https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html
- https://uiverse.io/ (took inspiration with some UI elements)
- https://www.youtube.com/watch?v=bXf_UdyDzSA
- https://www.geeksforgeeks.org/node-js-crypto-randomuuid-function/
