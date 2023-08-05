const MidjourneyAPI = require('./index.js');
const fs = require('fs');

const baseURL = 'your-api-base-url';
const apiKey = 'your-api-key';
const verbose = true;

const midjourney = new MidjourneyAPI(baseURL, apiKey, verbose);

(async () => {
  /**********  IMAGINE  ***********/

  // Imagine request
  const req1 = await midjourney.imagine('a red knight riding a blue horse', 'turbo');

  // wait 30 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 20 * 1000);
  });

  // Get result
  const res1 = await midjourney.getResult(req1.taskId);

  /**********  IMAGINE  ***********/

  /**********  UPSCALE IMAGE #2  ***********/

  // Upscale request
  const res2 = await midjourney.upscale(res1.taskId, 2);

  /**********  UPSCALE IMAGE #2 ***********/

  /**********  VARIATIONS OF IMAGE #3 ***********/

  // Variations request
  const req3 = await midjourney.variations(res1.taskId, 3);

  // wait 30 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 30 * 1000);
  });

  // Get result
  const res3 = await midjourney.getResult(req3.taskId);

  /**********  VARIATIONS OF IMAGE #3  ***********/

  /**********  GET SEED OF THE FIRST COMMAND  ***********/

  // seed request
  const req4 = await midjourney.getSeed(res1.taskId);

  // wait 5 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 5 * 1000);
  });

  // Get result
  const res4 = await midjourney.getResult(req4.taskId);


  /**********  GET SEED OF THE FIRST COMMAND ***********/


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