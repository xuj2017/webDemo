var nodemailer = require('nodemailer');

var mailTransport = nodemailer.createTransport('SMTP',{
    host: 'smtp.meadowlarktravel.com',
    secureConnection: true, // 用SSL 端口: 465
    auth:{
        user:MSCredentials.gmail.user,
        pass:credentials.gmail.password
    }
})

mailTransport.sendMail({
    from:'"Meadowlark Travel" <info@meadowlarktravel.com> ',
    to:'joecustomer@gamil.com',
    subject:'Your Meadowlark Travel Tour',
    text:'Thank you for booking your trip wjth Meadowlark Travel'+
    'We look forward to you visit',
},function(err){
    if(err) console.error('Unable to send email:' +error);
})