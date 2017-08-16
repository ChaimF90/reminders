import * as express from 'express-promise-router';
import * as db from '../repo';
import { Request, Response } from 'express';
import * as sendgrid from 'sendgrid';

const router = express();

const hepler = sendgrid.mail;
const fromEmail = new hepler.Email('chaimf21@gmail.com');
const subject = 'Email confirmation';
const content = new hepler.Content('text/html', `<h1>Eventually you will see a link to click here!! :)</h1>`);

const sg = sendgrid(process.env.SENDGRID);


router.post('/addUser', async (req: Request, res: Response) => {
    let newUser = await db.users.addUser(req.body);
    const toMail = new hepler.Email(newUser.email);
    const mail = new hepler.Mail(fromEmail, subject, toMail, content);
    const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail
    });
    try {
        await sg.API(request);
    } catch (e) {
        console.log(e);
    }
    res.json({ success: true });
});

export default router;