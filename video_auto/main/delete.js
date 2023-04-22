const {getFirestore, doc, deleteDoc} = require("firebase/firestore");
const {initializeApp} = require('firebase/app');
const {firebaseConfig} = require('./config')
const ID = require('./requests.json')
const documentID = ID[0]._DOCUMENT_ID_
const initializeFB = async () => {
    // USE YOUR FIREBASE PROJECT SETTINGS:
    //   Firebase Console >> Project Overview >> Apps
    //    >> (select or "Add App" web app) >> Config
    let fbApp = initializeApp(firebaseConfig);
    FIRESTORE = getFirestore(fbApp);
}

const run = async () =>{
    await initializeFB();

    const docRef = doc(FIRESTORE, "requests", documentID);

    deleteDoc(docRef)
    .then(() => {
        console.log("Entire Document has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
})
}
run()
module.exports = {run}