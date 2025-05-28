# MongoDB Setup Instructions

## Option 1: Use MongoDB Atlas (Recommended)

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas/register
2. Create a new cluster (the free tier is sufficient)
3. Click "Connect" on your cluster
4. Select "Connect your application"
5. Copy the connection string
6. Replace the MONGODB_URI in your .env file with your connection string:
   - Replace <username> with your Atlas database username
   - Replace <password> with your Atlas database password
   - Replace <cluster> with your Atlas cluster name

Example:
```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/smart-inventory?retryWrites=true&w=majority
```

## Option 2: Install MongoDB Locally using MongoDB Community Edition

1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Follow the installation instructions for your operating system
3. Start MongoDB service
4. Use the following in your .env file:
```
MONGODB_URI=mongodb://localhost:27017/smart-inventory
``` 