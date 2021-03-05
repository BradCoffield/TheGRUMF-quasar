import { firebaseDb } from "../boot/firebase";

const submissionsData = async () => {
  let ref = firebaseDb.collection("submissions");
  let allSubs = await ref.get();
  let theData = [];
  for (const doc of allSubs.docs) {
    let ddate;
    if (doc.data().updated) {
      ddate = new Date(doc.data().updated.toString());
    }
    theData.push({
      key: doc.id,
      name: doc.data().author,
      url: doc.data().file,
      title: doc.data().title,
      email: doc.data().email,
      notes: doc.data().notes,
      issue: doc.data().issue,
      updated: doc.data().updated,
      created: doc.data().created,
      updatedPretty: doc.data().updated ? ddate.toDateString() : " ",
      createdPretty: doc.data().created ? ddate.toDateString() : " ",
      author_letter: doc.data().author_letter,
      genre: doc.data().genre,
      primary_genre: doc.data().primary_genre,
      ratings: doc.data().ratings,
      decisionObject: doc.data().decisionObject
    });
  }
  return theData;
};

export default submissionsData;
