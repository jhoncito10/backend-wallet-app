// Database Seed Script
import dotenv from 'dotenv';
import { Database } from '../infrastructure/database/mongodb/Database';
import { UserModel } from '../infrastructure/database/mongodb/models/UserModel';
import { DocumentModel } from '../infrastructure/database/mongodb/models/DocumentModel';
import { TransactionModel } from '../infrastructure/database/mongodb/models/TransactionModel';
import bcrypt from 'bcrypt';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wallet-app';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    const database = Database.getInstance();
    await database.connect(MONGODB_URI);

    // Clear existing data
    await UserModel.deleteMany({});
    await DocumentModel.deleteMany({});
    await TransactionModel.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create demo users
    const hashedPassword = await bcrypt.hash('demo123', 10);
    
    const user1 = await UserModel.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: hashedPassword,
      balance: 5000,
    });

    await UserModel.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: hashedPassword,
      balance: 3500,
    });

    console.log('✅ Created demo users');

    // Create demo documents for user1
    await DocumentModel.insertMany([
      {
        userId: user1._id.toString(),
        name: 'Invoice-2025-001',
        status: 'completed',
        createdAt: new Date('2025-12-01'),
      },
      {
        userId: user1._id.toString(),
        name: 'Receipt-2025-042',
        status: 'completed',
        createdAt: new Date('2025-12-05'),
      },
      {
        userId: user1._id.toString(),
        name: 'Contract-2025-15',
        status: 'processing',
        createdAt: new Date('2025-12-08'),
      },
      {
        userId: user1._id.toString(),
        name: 'Report-December-2025',
        status: 'pending',
        createdAt: new Date('2025-12-10'),
      },
    ]);

    console.log('✅ Created demo documents');

    // Create demo transactions for user1
    await TransactionModel.insertMany([
      {
        userId: user1._id.toString(),
        type: 'recharge',
        amount: 1000,
        description: 'Initial balance',
        createdAt: new Date('2025-11-01'),
      },
      {
        userId: user1._id.toString(),
        type: 'recharge',
        amount: 2500,
        description: 'Monthly top-up',
        createdAt: new Date('2025-11-15'),
      },
      {
        userId: user1._id.toString(),
        type: 'expense',
        amount: 150,
        description: 'Document generation fee',
        createdAt: new Date('2025-12-01'),
      },
      {
        userId: user1._id.toString(),
        type: 'recharge',
        amount: 3000,
        description: 'December recharge',
        createdAt: new Date('2025-12-01'),
      },
      {
        userId: user1._id.toString(),
        type: 'expense',
        amount: 75,
        description: 'Processing fee',
        createdAt: new Date('2025-12-05'),
      },
      {
        userId: user1._id.toString(),
        type: 'expense',
        amount: 225,
        description: 'Premium document generation',
        createdAt: new Date('2025-12-08'),
      },
      {
        userId: user1._id.toString(),
        type: 'recharge',
        amount: 500,
        description: 'Bonus credit',
        createdAt: new Date('2025-12-09'),
      },
    ]);

    console.log('✅ Created demo transactions');

    console.log('\n📊 Database seeded successfully!');
    console.log('Demo accounts created:');
    console.log('  📧 Email: demo@example.com');
    console.log('  🔑 Password: demo123');
    console.log('  💰 Balance: 5000');
    console.log('  📄 Documents: 4');
    console.log('  💳 Transactions: 7');
    console.log('\n  📧 Email: jane@example.com');
    console.log('  🔑 Password: demo123');
    console.log('  💰 Balance: 3500');

    await database.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
