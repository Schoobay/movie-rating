const admin = require("firebase-admin");
const serviceAccount = require("/Users/reubenmurphy/Documents/GitHub/movie-rating/movie-rating-f7eee-firebase-adminsdk-rauqq-4d1cd951f7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movie-rating-f7eee.firebaseapp.com",
});

const firestore = admin.firestore();

async function updateCollection() {
  const collectionRef = firestore.collection("movies");

  try {
    const snapshot = await collectionRef.get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      data.glen = null;
      collectionRef.doc(doc.id).set(data);
    });
    console.log("Documents updated successfully.");
  } catch (error) {
    console.error("Error updating documents:", error);
  }
}

updateCollection();
