// app/api/updates/route.ts
import { NextRequest } from 'next/server';
import { initChangeStream } from '@/lib/mongodb/changeStreamHandler';

let activeConnections: { controller: ReadableStreamDefaultController; changeStream: any }[] = [];

export async function GET(req: NextRequest) {
  // Initialize the change stream
  const changeStream = await initChangeStream();

  const stream = new ReadableStream({
    start(controller) {
      // Push the controller to active connections
      activeConnections.push({ controller, changeStream });

      // Listen for changes and send to client
      changeStream.on('change', (change) => {
        const data = JSON.stringify(change);
        controller.enqueue(`data: ${data}\n\n`);
      });
      req.signal.addEventListener('abort', () => {
        controller.close();
        changeStream?.close();
        activeConnections = activeConnections.filter((c) => c.controller !== controller);
      });
    },
    cancel() {
        // The 'controller' reference is available through the 'activeConnections' array
        activeConnections.forEach(({ controller, changeStream }) => {
          controller.close();
          changeStream.close();
        });
        activeConnections = [];
      }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// Optional: Close all connections when the server shuts down or on other events
function closeAllConnections() {
  activeConnections.forEach(({ controller, changeStream }) => {
    controller.close();
    changeStream.close();
  });
  activeConnections = [];
}
