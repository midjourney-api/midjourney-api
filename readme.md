


# [Midjourney API](https://midjourneyapi.io) (unofficial)

A simple NPM module that wraps the [Midjourney API](https://midjourneyapi.io), providing an easy-to-use interface for interacting with the [Midjourney API](https://midjourneyapi.io) services.

## Installation

```bash
npm install midjourney-api
```

## Usage

Import the `MidjourneyAPI` class and create an instance with your API key and desired options. You can get your API Key and API Base URL at [Midjourney AI API](https://midjourneyapi.io)

```javascript
const MidjourneyAPI = require('midjourney-api');

const baseURL = 'your-api-base-url';
const apiKey = 'your-api-key';
const verbose = true;

const midjourney = new MidjourneyAPI(baseURL, apiKey, verbose);
```

### Methods

The module provides the following methods:

- `imagine(prompt, callbackURL)`: Generate an image using a text prompt.
- `upscale(messageId, jobId, position, callbackURL)`: Upscale one of the 4 generated images by the Imagine command.
- `variations(messageId, jobId, position, callbackURL)`: Create 4 new variations of one of the 4 generated images by the Imagine command.
- `uploadImage(image)`: Upload an image and get an image URL back.
- `getSeed(messageId, jobId, callbackURL)`: Get the seed of a generated image.
- `describe(image, callbackURL)`: Writes four example prompts based on an uploaded image.
- `blend(images, dimension, callbackURL)`: Blend multiple images into one image.
- `remix(messageId, jobId, callbackURL)`: Reroll to create new images from a previous prompt.
- `getResult(resultId)`: Get the final result for a submitted job.

For more detailed information about these methods and their parameters, please refer to the [Midjourney API documentation](https://docs.midjourneyapi.io).

## Example

```javascript
const MidjourneyAPI = require('midjourney-api');
const fs = require('fs');

const baseURL = 'your-api-base-url';
const apiKey = 'your-api-key';
const verbose = true;

const midjourney = new MidjourneyAPI(baseURL, apiKey, verbose);

(async () => {
  /**********  IMAGINE  ***********/

  // Imagine request
  const req1 = await midjourney.imagine('a red knight riding a blue horse');

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

```

## License

This project is licensed under the MIT License.