# Daily.co unofficial dashboard

Some stats for Daily.co video call services (there is more than in the screenshots). Also feature a real call duration which is the sum of the duration when 2 or more peoples are in the same call. 

![Screenshot](https://raw.githubusercontent.com/HugoGresse/Daily.co-dashboard/master/public/screenshot.png)

# Setup:
0. Clone this repo
1. Create a Firebase project
2. Copy the `.env` to `.env.local` and fill the info from Firebase configuration
3. Set function env for Daily.co: `firebase functions:config:set dailyco.apikey=<YOUR_API_KEY>`
4. Add a credit card on Google Cloud Platform (necessary for network request going out of Google datacenters, but you shouldn't pay more than 0.1€ by month for less than 10 users or so).
4. Deploy the app to Firebase Hosting  
    `npm run deploy`


# Contribute
1. Clone this repo
2. `npm i`
3. `cd functions && npm i`
4. `cd functions && npm run serve`
5. `npm start`

# About
Open source project made by [Hugo Gresse](https://hugo.gresse.io)  
Hugo other projects:
- [Open Feedback (event feedback SASS)](https://openfeedback.io/)
