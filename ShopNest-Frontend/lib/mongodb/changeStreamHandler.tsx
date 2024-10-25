// // lib/changeStreamHandler.ts
// import clientPromise from './mongodbClient'
// export async function initChangeStream() {
//   try {
//     const client = await clientPromise;
//     const database = client.db('ShopNest'); 
//     const changeStream = database.watch();

//     changeStream.on('change', (change) => {
//       // console.log('Change detected:', change);
//       // Add logic to send updates to the client using SSE
//     });

//     return changeStream;
//   } catch (error) {
//     console.error('Error initializing change stream:', error);
//   }
// }
