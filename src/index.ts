import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import bcrypt from 'bcrypt';
import db from '../models';
import { UserAttributes } from '../models/user';
import { InsertData, checkData } from '../controllers/JsonDataIngestion';
import * as sass from 'node-sass';
import { FetchFulfillmentsData, FetchVisitorData, FetchItemsPlacedOverTime, FetchOrderPlacedOverTime, FetchSalesRevenueOverTime } from '../controllers/homeController';

const flash = require('connect-flash');

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? "3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
        secret: process.env.SESSION_SECRET ?? 'yoursecretkey', // secret key for session
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // secure should be set to true in production
    })
)

app.use(flash())
// set views path
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Configure the local strategy for email and password authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email: string, password: string, done: any) => {
    try {
        // Find the user in the database
        const user = await db.User.findOne({ where: { email } });

        // If the user is not found, return an error
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password is incorrect, return an error
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        // If the email and password are correct, return the user
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));


export const serializeUser = (user: any, done: any) => {
    done(null, user.id);
};

export const deserializeUser = async (id: any, done: any) => {
    try {
        const user = await db.User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
};

passport.serializeUser(serializeUser);

passport.deserializeUser(deserializeUser);

interface SessionData {
    user: UserAttributes
}


const isLoggedIn = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).redirect("/login");
}

app.get('/', (req: Request, res: Response) => {
    // if logged in 
    if (req.isAuthenticated()) {
        //rediret -> home
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

app.get('/home', isLoggedIn, async (req: Request, res: Response) => {
    const checkFlag =  await checkData();
    if (!checkFlag) {
        console.log("Data is not present inside Database! Inserting :)")
        await InsertData();
        console.log("Inserting Data Complete!")
    } 
    const visitorData = await FetchVisitorData();
    const fulfillmentData = await FetchFulfillmentsData();
    const salesOrdersByDate = await FetchItemsPlacedOverTime();
    const orderCountByDate = await FetchOrderPlacedOverTime();
    const salesRevenue = await FetchSalesRevenueOverTime();
    
    console.log("salesOrderByDate", salesOrdersByDate);
    res.render('home', {
        user: req.user,
        visitorData: visitorData,
        fulfillmentData: fulfillmentData,
        salesOrdersByDate: salesOrdersByDate,
        orderCountByDate: orderCountByDate,
        salesRevenue: salesRevenue
    });
})

app.get('/login', (req: Request, res: Response) => {
    res.render('login');
})

app.post("/logout", (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.redirect("/");
        });
        res.clearCookie('connect.sid');
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', (req: Request, res: Response) => {
    res.render('register');
})

app.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    // Hash the password
    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        // Replace this with your database logic
        const user = await db.User.build({ email, password: hashedPassword });
        await user.save();
        // Log the user in
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/');
        });
    } catch (err) {
        console.log("Error registering user into database", err);
    }
});

app.get("/insertData", async (req: Request, res: Response) => {
    try {
        await InsertData();
        res.status(200).send("Data Insertion Completed!");
    } catch (err) {
        console.log("Error inserting data route : ", err);
        return res.status(500)
    }
})

app.get('/style.css', (req: Request, res: Response) => {
    sass.render({
        file: './sass/home.scss',
        outputStyle: 'expanded'
    }, (error: any, result: any) => {
        if (error) {
            console.log("Sass file conversion error : ", error.message);
        } else {
            res.setHeader('Content-Type', 'text/css');
            res.send(result.css);
        }
    });
});

app.get('/loginStyle.css', (req: Request, res: Response) => {
    sass.render({
        file: './sass/login.scss',
        outputStyle: 'expanded'
    }, (error: any, result: any) => {
        if (error) {
            console.log("Sass login style file conversion error : ", error.message);
        } else {
            res.setHeader('Content-Type', 'text/css');
            res.send(result.css);
        }
    });
});

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})