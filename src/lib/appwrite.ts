import { 
  Client,
  Databases,
  ID,
  Query,
} from 'appwrite';

const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const VITE_APPWRITE_URL = import.meta.env.VITE_APPWRITE_URL;

const client = new Client()
  .setEndpoint(VITE_APPWRITE_URL) 
  .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export { databases, ID, Query }