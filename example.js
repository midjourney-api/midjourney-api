const MidjourneyAPI = require('./index.js');
const fs = require('fs');

const baseURL = 'your-api-base-url';
const apiKey = 'your-api-key';
const verbose = true;

const midjourney = new MidjourneyAPI(baseURL, apiKey, verbose);

(async () => {
  /**********  IMAGINE  ***********/

  // Imagine request
  const req1 = await midjourney.imagine('a red dog ridding a blue horse');

  // wait 30 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 30 * 1000);
  });

  // Get result
  const res1 = await midjourney.getResult(req1.resultId);

  /**********  IMAGINE  ***********/

  /**********  UPSCALE IMAGE #2  ***********/

  // Upscale request
  const req2 = await midjourney.upscale(res1.messageId, res1.jobId, 2);

  // wait 30 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 30 * 1000);
  });

  // Get result
  const res2 = await midjourney.getResult(req2.resultId);

  /**********  UPSCALE IMAGE #2 ***********/

  /**********  VARIATIONS OF IMAGE #3 ***********/

  // Variations request
  const req3 = await midjourney.variations(res1.messageId, res1.jobId, 3);

  // wait 30 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 30 * 1000);
  });

  // Get result
  const res3 = await midjourney.getResult(req3.resultId);

  /**********  VARIATIONS OF IMAGE #3  ***********/

  /**********  GET SEED OF THE FIRST COMMAND  ***********/

  // seed request
  const req4 = await midjourney.getSeed(res1.messageId, res1.jobId);

  // wait 5 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 5 * 1000);
  });

  // Get result
  const res4 = await midjourney.getResult(req4.resultId);


  /**********  GET SEED OF THE FIRST COMMAND ***********/

  /**********  BLEND TWO IMAGES  ***********/

  // seed request
  const req5 = await midjourney.blend(
    [{  // FILE 1
        file: fs.createReadStream('./images/image1.png'),
        name: 'image1.png'
    },
    {   // FILE 2
        file: fs.createReadStream('./images/image2.png'),
        name: 'image2.png'
    },
    {   // FILE 3
        file: fs.createReadStream('./images/image3.png'),
        name: 'image3.png'
    }],
    'Landscape',
  );

  // wait 30 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 30 * 1000);
  });

  // Get result
  const res5 = await midjourney.getResult(req5.resultId);

  /**********  BLEND TWO IMAGES ***********/

  /**********  DESCRIBE AN IMAGE  ***********/

  // seed request
  const req6 = await midjourney.describe(
    {  // FILE 1
        file: fs.createReadStream('./images/image2.png'),
        name: 'image2.png'
    }
  );

  // wait 30 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 30 * 1000);
  });

  // Get result
  const res6 = await midjourney.getResult(req6.resultId);

  /**********  DESCRIBE AN IMAGE  ***********/
})();