import { NextFunction, Request, Response, Router } from 'express';
import { getProductRepository } from './database/databaseContext';
import { MessageStatistics } from './database/messageStatistics';
import { MessageViewModel } from './messageViewModel';

export const router: Router = Router();

router.post('/message', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getProductRepository();      
        var messageStatistics = await repository.findOne({sourceIpAddress: req.ip});
        const message: string = req.body.message;

        // TODO: If this web service is to scale horizontally (multiple instances) 
        // this code is vulnerable to a race condition. If there are concurrent multiple 
        // requests from the same IP address message stats can be wrong. 
        // To work around this I would look into splitting the work of saving a 
        // message and calculating the IP address message stats. The web service would 
        // simply insert a new message into a new table (maybe tblMessage). 
        // Some other service or task would then aggregate the message statistics by IP address. 

        if (!messageStatistics) {
        // we have not seen this ip address before, add the new message stats 
        messageStatistics = new MessageStatistics();
        messageStatistics.sourceIpAddress = req.ip;
        messageStatistics.messageCount = 1;
        messageStatistics.minLength = message.length;
        messageStatistics.maxLength = message.length;
        messageStatistics.averageLength = message.length;
        messageStatistics.meanLength = message.length;        
        }
        else {
        // we already have a record for this IP address, update it        
        let oldCount = messageStatistics.messageCount;
        let newCount = oldCount + 1;
        if (message.length < messageStatistics.minLength)
            messageStatistics.minLength = message.length;
        if (message.length > messageStatistics.maxLength)
            messageStatistics.maxLength = message.length;        
        //New average = old average * (n-1)/n + new value /n        
        let oldAverageLength = messageStatistics.averageLength;
        let newAverageLength = oldAverageLength * oldCount / newCount + message.length / newCount;
        messageStatistics.averageLength = newAverageLength;
        messageStatistics.meanLength = newAverageLength;
        messageStatistics.messageCount = newCount;
        }
        const result = await repository.save(messageStatistics);

        const messageViewModel = new MessageViewModel();
        messageViewModel.message = message;
        messageViewModel.from = req.ip;
        const date = new Date();
        messageViewModel.timestamp = date.toISOString();

        res.send(messageViewModel);
    }
    catch (err) {
        return next(err);
    }
});