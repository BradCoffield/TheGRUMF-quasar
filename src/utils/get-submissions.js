import { firebaseDb } from "../boot/firebase";
import noCase from "../utils/toNoCase";

const submissionsData = async () => {
  console.log("getting submissions data - 1")
  let ref = firebaseDb.collection("submissions");
  let allSubs = await ref.get();
  let theData = [];
  for (const doc of allSubs.docs) {
    let ddate;
    if (doc.data().updated) {
      ddate = new Date(doc.data().updated.toString());
    }
    function toSpaceCase(string) {
      return noCase(string)
        .replace(/[\W_]+(.|$)/g, function(matches, match) {
          return match ? " " + match : "";
        })
        .trim();
    }
    function toCapitalCase(string) {
      return toSpaceCase(string).replace(/(^|\s)(\w)/g, function(
        matches,
        previous,
        letter
      ) {
        return previous + letter.toUpperCase();
      });
    }

  console.log("getting submissions data - 2");
    theData.push({
      key: doc.id,
      name: doc.data().author,
      url: doc.data().file,
      title: doc.data().title,
      email: doc.data().email,
      notes: doc.data().notes,
      issue: toCapitalCase(doc.data().issue),
      // issue: doc.data().issue.toUpperCase(),
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
