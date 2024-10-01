import { Databases, Avatars, ID, Account, Client, Query } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.ads.active',
  projectId: '66f74835001c0230629c',
  databaseId: '66f74a48001e888d5b0e',
  userCollectionId: '66f74a9f000aeaf838b3',
  activitiesColletionId: '66f74c99003dd1947a52',
  storageId: '66f74dc200193a94a59d',
  postsCollectionId: '66fbc104000132ce8265',
}

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    // gets the initials of user's name
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Sign In
export const signIn = async (email, password) => {
  try {

    // allow user to log into their account by providing a valid email and password combination
    const session = await account.createEmailPasswordSession(email, password)

    return session;

  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error;

    return currentUser.documents[0];

  } catch (error) {
    console.log(error)
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get news posts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
    )

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all profiles
export const getAllProfiles = async () => {
  try {
    const profiles = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
    )

    return profiles.documents;
  } catch (error) {
    throw new Error(error);
  }
}