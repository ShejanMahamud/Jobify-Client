# Jobify - Job Portal Web Application (In Progress)

<p>Jobify is a comprehensive job portal web app developed using the MERN stack. It provides a seamless platform where candidates can apply for jobs, and companies can explore candidates for their posted jobs and manage the status of applications. Additionally, companies can subscribe to a Premium Plan via SSL COMMERZ and Stripe.</p>

# Company Account

```
email: shazid006@gmail.com
password: Smjihad0

```

# Admin Account

```
email: dev.shejanmahamud@gmail.com
password: Smjihad0

```

# Server Side Code

[Repo Link](https://github.com/ShejanMahamud/Jobify-Server)

# Live Link

[Netlify Link](https://jobify-web.netlify.app/)

# Key Features

> - User Authentication & Authorization
> - Social Login/Register & Email Password Based Login/Register
> - Private Route and Role Based Route
> - Companies can add job and if company complete their profile 80% then can add job otherwise not.
> - There will be a cron job in server that will run every 24hr to check jobs expiration date, is job expired or not.
> - Company can select Apply On: 1. Jobify Platform 2. Companies Website 3. Email. Which selected that will show to candidate
> - Update companies public profile from company dashboard
> - Companies can see all candidate application based on each job.
> - Company can delete or expire their job manually
> - In application time user submitted cover letter and resume also will show based on each candidate.
> - Company can change status of an application - In Review, Task Submission, Interview Scheduled, Interviewed, Offered, Hired, Rejected
> - In each status change automatic an email will sent to candidate via nodemailer.
> - If candidate hired, then that candidate will add as team member in team section in dashboard
> - In settings, Company can add their info and update their info.
> - Also a common settings page, there will be email change, location add or update and added a captcha verification system for updating email and set job preferences (Only for candidates) and delete account feature.
> - Company can promote their job and promote company based on subscription model. Promoted Job and companies will show at top of each section. Companies can pay via STRIPE(International) & SSLCOMMERZ (Local) and if payment completed then it will show in billings section of dashboard . From Billing, subscription delete or pay
> - In candidate account, candidate can apply on job by submitting a cover letter and their resume (resume can also save from their profile in dashboard)
> - Bookmark a job and show in dashboard > bookmarked Jobs
> - Applied jobs show in dashboard > Applied Jobs
> - Set job preferences from dashboard > settings. Based on job preference they will get job alerts (In future these will be replaced as notification system)
> - Also candidate can update or add info from dashboard > profile
> - Related Jobs will show in job details page. From companies profile page there will be a section called open jobs from that company

# Future Feature Plan

> - Message System
> - Notification system
> - A complete job filter system

# NPM Packages Used

> - Recharts
> - SwiperJS
> - Ant Design
> - Tanstack Query
> - react-icons
> - axios

# Technologies Used

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TAILWIND CSS](https://img.shields.io/badge/TAILWINDCSS-37B6F1?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![React](https://img.shields.io/badge/REACT-37B6F1?style=for-the-badge&logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/REACT%20ROUTER-red?style=for-the-badge&logo=react-router&logoColor=white)
![Firebase](https://img.shields.io/badge/FIREBASE-yellow?style=for-the-badge&logo=firebase&logoColor=white)
![expressJS](https://img.shields.io/badge/EXPRESS-3C873A?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MONGODB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/NODEJS-3C873A?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

# Problem Faced and Solution

One of the requirements was to ensure that job expiration statuses were automatically updated. To achieve this, I implemented a cron job that runs every 24 hours to check if any jobs have expired and update their status accordingly. Here’s a brief explanation of the approach:

1. **Cron Job Implementation**: Set up a cron job in the server that executes every 24 hours.
2. **Expiration Check**: The cron job checks the expiration date of each job posting.
3. **Status Update**: If a job is found to be expired, its status is automatically updated to "expired".

This approach ensures that job postings are accurately and efficiently managed without manual intervention, maintaining the integrity and reliability of the job listings.

Additionally, while developing this project, I created a captcha verification system and packaged it as an npm package called [react-awesome-captcha](https://www.npmjs.com/package/react-awesome-captcha).

# Run This Project

```
https://github.com/ShejanMahamud/Jobify-Client.git
```
```
npm install
```
Create .env file in root of folder. Use firebase credentials in .env file

Dev Mode:
```
npm run dev
```
Build Mode:
```
npm run build
```

# 

# Thanks For Reading & Visiting!
