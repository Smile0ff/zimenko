import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
});

app.post('/enquiry', (req, res, next) => {

    let timer = setTimeout(() => {

        let formData = req.body;

        if(!formData.email || !formData.email || !formData.message){
            let err = new Error('Something goes wrong, please try again later');
            err.status = 400;

            return next(err);
        }
        
        res.status(201).json({
            message: 'Your message successfully sent, our manager will contact you as soon as possible.'
        });

        clearTimeout(timer);
    }, 1000);
    
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message
    });
});

app.listen(3001, () => {
    console.log('server is running');
});