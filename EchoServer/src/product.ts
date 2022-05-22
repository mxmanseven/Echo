import { NextFunction, Request, Response, Router } from 'express';
import { getProductRepository, MessageStatistics } from './model';
//import { getProductRepository, Product } from './model';

export const router: Router = Router();


router.post('/product', async function (req: Request, res: Response, next: NextFunction) {
    try {
      console.log('in router post');
      console.log('req.body:' + req.body.message);
      const repository = await getProductRepository();
      
      var messageStatistics = await repository.findOne({sourceIpAddress: req.ip});
            
      const message: string = req.body.message;

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
      res.send(result);
    }
    catch (err) {
      return next(err);
    }
  });
  
//   router.post('/product/:id', async function (req: Request, res: Response, next: NextFunction) {
//     try {
//       const repository = await getProductRepository();
//       const product = await repository.findOne(req.params.id);
//       product.name = req.body.name;
//       product.sku = req.body.sku;
//       product.description = req.body.description;
//       product.price = Number.parseFloat(req.body.price);
//       product.stock = Number.parseInt(req.body.stock);
  
//       const result = await repository.save(product);
//       res.send(result);
//     }
//     catch (err) {
//       return next(err);
//     }
//   });

// router.get('/product', async function (req: Request, res: Response, next: NextFunction) {
//   try {
//     const repository = await getProductRepository();
//     const allProducts = await repository.find();
//     res.send(allProducts);
//   }
//   catch (err) {
//     return next(err);
//   }
// });

// router.get('/product/:id', async function (req: Request, res: Response, next: NextFunction) {
//   try {
//     const repository = await getProductRepository();
//     const product = await repository.findOne(req.params.id);
//     res.send(product);
//   }
//   catch (err) {
//     return next(err);
//   }
// });


// router.delete('/product/:id', async function (req: Request, res: Response, next: NextFunction) {
//   try {
//     const repository = await getProductRepository();
//     await repository.delete(req.params.id);
//     res.send('OK');
//   }
//   catch (err) {
//     return next(err);
//   }
// });