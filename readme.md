


# [Midjourney API](https://apiframe.pro) (unofficial)

## A simple NPM module that wraps the [Midjourney API](https://apiframe.pro), providing an easy-to-use interface for interacting with the [Midjourney API](https://apiframe.pro) services.

This service deprecated, take a look at https://apiframe.pro

## Installation

```bash
npm install midjourney-api
```

## Usage

Import the `MidjourneyAPI` class and create an instance with your API key and desired options. You can get your API Key and API Base URL at [Midjourney AI API](https://apiframe.pro)

```javascript
const MidjourneyAPI = require('midjourney-api');

const apiKey = 'your-api-key';
const verbose = true;

const midjourney = new MidjourneyAPI(apiKey, verbose);
```

### Methods

The module provides the following methods:

- `imagine(prompt, callbackURL)`: Generate an image using a text prompt.
- `upscale(taskId, position)`: Upscale one of the 4 generated images by the Imagine command.
- `variations(taskId, position, callbackURL)`: Create 4 new variations of one of the 4 generated images by the Imagine command.
- `uploadImage(image)`: Upload an image and get an image URL back.
- `getSeed(taskId, callbackURL)`: Get the seed of a generated image.
- `describe(image, callbackURL)`: Writes four example prompts based on an uploaded image.
- `faceswap(targetImageURL, faceImageURL)`: Swap the face on the target image with the face on source image.
- `getResult(taskId)`: Get the final result for a submitted job.

For more detailed information about these methods and their parameters, please refer to the [Midjourney API documentation](https://apiframe.pro).

## Example

```javascript
const MidjourneyAPI = require('midjourney-api');
const fs = require('fs');

const apiKey = 'your-api-key';
const verbose = true;

const midjourney = new MidjourneyAPI(apiKey, verbose);

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

```

## License

This project is licensed under the MIT License.
