# 🌐 Okirikiri

Okirikiri is a decentralized platform designed to facilitate circular donations and foster community empowerment through blockchain technology.

## 🛠️ Tech Stack

- Next.js
- Tailwind CSS v3.3
- Redux
- Ethers
- Thirdweb


## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Setup Environment Variables
Create a .env file in the root directory using the provided .env.sample as a reference

Update the variables with your local or production configuration.

⚠️ Do not commit .env to version control – it contains sensitive data.

### 2. Install Dependencies
Install all required npm packages:

npm install
### 3. Run the Development Server
Start the development server with:
npm run dev
Once the server is running, open your browser and visit:

http://localhost:3000


### 📦 Production Build
To create an optimized build and start the production server:

npm run build
npm start


### 🧪 Linting & Formatting
Run the following to check and format your code:


npm run lint     # Check for linting issues
npm run format   # Format code using Prettier


//google shit content
function contectUsFunction(e) {
  const sheet = SpreadsheetApp.getActiveSheet();


  if (e.postData.contents) {
    const data = JSON.parse(e.postData.contents);


    const timestamp = new Date().toLocaleString("en-CA", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })


    sheet.appendRow([data.name, data.email, data.message, timestamp]);

    Logger.log(data);


    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } else {
    return ContentService.createTextOutput("No Data Recived").setMimeType(ContentService.MimeType.TEXT);

  }
}



//level 4 complete hase ema fee nai lage


//get amount out ma fee ane slipage tolrace - karvana



//completed and currentlevel same hoy tyare exit ane next level button show karva

withdrow pan balance > 0 hoy toj batavvu