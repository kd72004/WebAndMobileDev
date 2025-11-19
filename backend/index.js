const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'https://splitwise.vercel.app', 'https://splitwise-app.vercel.app', 'https://split-wise-sepia.vercel.app', 'https://split-wise-ekabx9zk7-kalyani-daves-projects.vercel.app'],
    credentials: true
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

// View routes (EJS pages)
app.use('/', require('./routes/viewRoutes'));

// API routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
app.use('/api/group-memberships', require('./routes/groupMembershipRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/settlements', require('./routes/settlementRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/expense-insights', require('./routes/expenseInsightsRoutes'));

app.get('/health', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
