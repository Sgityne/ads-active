import { Databases, Avatars, ID, Account, Client, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.ads.active',
  projectId: '66f74835001c0230629c',
  databaseId: '66f74a48001e888d5b0e',
  userCollectionId: '66f74a9f000aeaf838b3',
  activitiesCollectionId: '66f74c99003dd1947a52',
  storageId: '66f74dc200193a94a59d',
  postsCollectionId: '66fbc104000132ce8265',
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);


// Register user
export async function createUser (email, password, username)  {
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

  } catch (error) {;
    throw new Error(error);
  }
}

// Sign In
export async function signIn  (email, password)  {
  try {

    // allow user to log into their account by providing a valid email and password combination
    const session = await account.createEmailPasswordSession(email, password);

    return session;

  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount () {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser ()  {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    
    if(!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
    return null;
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
export async function getAllPosts () {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all profiles
export async function getAllProfiles (userId) {
  try {
    const profiles = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.notEqual("$id", userId)],
    );

    return profiles.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Profile that matches search query
export async function searchProfile (query, userId) {
  try {
    const profiles = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.search("username", query),
        Query.notEqual("$id", userId)
      ]
    );

    if (!profiles) throw new Error("Something went wrong");

    return profiles.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Profile that matches Profile Explorer's query
export async function searchProfilebyId (query) {
  try {
    const profiles = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("$id", query)]
    );

    if (!profiles) throw new Error("Something went wrong");

    return profiles.documents[0];
  } catch (error) {
    throw new Error(error);
  }
}

// Get Acitivity created by user
export async function getUserActivities (userId) {
  try {
    const profiles = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.activitiesCollectionId,
      [
        Query.equal("user", userId),
        Query.orderDesc("$createdAt")
      ]
    );

    if (!profiles) throw new Error("Something went wrong");

    return profiles.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Activity
export async function createActivity(form) {
  try {
    const newActivity = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.activitiesCollectionId,
      ID.unique(), {
        type: form.type,
        time: form.time,
        distance: form.distance,
        user: form.userId,
      }
    );

    return newActivity;
  } catch (error) {
    throw new Error(error)
  }
}

// Get latest created activities
export async function getLatestActivities (userId) {
  try {
    const activities = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.activitiesCollectionId,
      [
        Query.equal("user", userId),
        Query.orderDesc("$createdAt"),
        Query.limit(2)
      ]
    );

    return activities.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId) {
  let fileUrl;

  try {
    fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100)

    if(!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error("Invalid file type");
  }
}

// Upload File
export async function uploadFile (file) {
  if(!file) return;
  
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }
  
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset,
    );

    const fileUrl = await getFilePreview(uploadedFile.$id);

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Update your Profile
export async function updateProfile(form, userId) {
  try {
    const documentId = userId;

    const [bannerUrl, avatarUrl] = await Promise.all([
      uploadFile(form.banner),
      uploadFile(form.avatar),
    ])

    // Check if form has any fields to update
    const updateFields = {};
    if (form.name !== null) {
      updateFields.name = form.name;
    }
    if (form.bio !== null) {
      updateFields.bio = form.bio;
    }
    if (form.favorite !== null) {
      updateFields.favorite = form.favorite;
    }
    if (form.banner !== null) {
      updateFields.banner = bannerUrl;
    }
    if (form.avatar !== null) {
      updateFields.avatar = avatarUrl;
    }

    // If no fields to update, throw an error
    if (Object.keys(updateFields).length === 0) {
      throw new Error("No fields to update");
    }

    // Update the document with the specified fields
    const update = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      documentId,
      updateFields
    );

    if (!update) throw new Error("Failed to update profile");

    return update.documents;

  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
}

// Get user's showcase activity
export async function getUserShowcase (userId, userFavoriteId) {
  try {
    const showcase = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("favorite", userFavoriteId),
      ]
    );

    return showcase.documents;
  } catch (error) {
    throw new Error(error);
  }
}


