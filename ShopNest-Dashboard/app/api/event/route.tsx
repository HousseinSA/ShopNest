// import { NextRequest, NextResponse } from 'next/server';

// let activeConnections: ReadableStreamDefaultController<any>[] = [];

// export async function GET(req: NextRequest) {
//   const stream = new ReadableStream({
//     start(controller) {
//       activeConnections.push(controller);

//       // Simulate sending some data
//       const intervalId = setInterval(() => {
//         const data = JSON.stringify({ message: 'update' });
//         controller.enqueue(`data: ${data}\n\n`);
//       }, 1000);

//       req.signal.addEventListener('abort', () => {
//         clearInterval(intervalId); // Clear interval to stop data sending
//         controller.close(); // Close the stream
//         activeConnections = activeConnections.filter((c) => c !== controller);
//       });
//     },
//     cancel() {
//       activeConnections = activeConnections.filter((c) => c !== controller);
//     },
//   });

//   return new Response(stream, {
//     headers: {
//       'Content-Type': 'text/event-stream',
//       'Cache-Control': 'no-cache',
//       'Connection': 'keep-alive',
//     },
//   });
// }

// // Example of closing all connections
// function closeAllConnections() {
//   activeConnections.forEach((controller) => {
//     controller.close(); // Close the stream
//   });
//   activeConnections = []; // Clear the list of active connections
// }



import { NextRequest, NextResponse } from 'next/server';

let activeConnections: ReadableStreamDefaultController<any>[] = [];

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller: ReadableStreamDefaultController<any>) {
      activeConnections.push(controller);

      // Simulate sending some data
      const intervalId = setInterval(() => {
        const data = JSON.stringify({ message: 'update' });
        controller.enqueue(`data: ${data}\n\n`);
      }, 1000);

      req.signal.addEventListener('abort', () => {
        clearInterval(intervalId); // Clear interval to stop data sending
        controller.close(); // Close the stream
        activeConnections = activeConnections.filter((c) => c !== controller);
      });
    },
    cancel(controller: ReadableStreamDefaultController<any>) {
      activeConnections = activeConnections.filter((c) => c !== controller);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// Example of closing all connections
function closeAllConnections() {
  activeConnections.forEach((controller) => {
    controller.close(); // Close the stream
  });
  activeConnections = []; // Clear the list of active connections
}
