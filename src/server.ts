// Main Server Entry Point
import dotenv from 'dotenv';
import { Database } from './infrastructure/database/mongodb/Database';
import { App } from './infrastructure/http/app';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wallet-app';
const FIXED_TOKEN = process.env.FIXED_TOKEN || 'mi-token-super-secreto-12345';
const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret-key-for-internal-use';

async function startServer() {
  try {
    // Connect to MongoDB
    const database = Database.getInstance();
    await database.connect(MONGODB_URI);

    // Initialize Express app
    const application = new App(FIXED_TOKEN, JWT_SECRET);
    const app = application.getApp();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔒 Fixed Token: ${FIXED_TOKEN}`);
      console.log(`\n📋 Available endpoints:`);
      console.log(`   GET  /health`);
      console.log(`   POST /api/auth/register`);
      console.log(`   POST /api/auth/login`);
      console.log(`   GET  /api/dashboard`);
      console.log(`   GET  /api/documents`);
      console.log(`   POST /api/documents/generate`);
      console.log(`   GET  /api/transactions`);
      console.log(`\n💡 All /api/* routes require 'Authorization' header with fixed token`);
      console.log(`💡 Protected routes also require 'x-user-token' header with JWT token\n`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down gracefully...');
      await database.disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
