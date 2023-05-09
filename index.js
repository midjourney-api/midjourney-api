const axios = require('axios').default;
const FormData = require('form-data');

// Main class declaration
class MidjourneyAPI {
  constructor(baseURL, apiKey, verbose = false) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.verbose = verbose;

    if (!baseURL || !apiKey) {
      throw new Error('baseURL and apiKey are required!');
    }
  }

  /**
   * https://docs.midjourneyapi.io/midjourney-api/midjourney-api/imagine
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Generate an image using a text prompt.
   *
   * This is the /imagine command on Discord.
   */
  async imagine(prompt, callbackURL = undefined) {
    try {
      const data = JSON.stringify({
        prompt,
        callbackURL,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/imagine`,
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const { data: responseData } = await axios.request(config);

      if (this.verbose) {
        console.log({
          response: responseData,
        });
      }

      return {
        ...responseData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Imagine request failed!');
    }
  }

  /**
   * https://docs.midjourneyapi.io/midjourney-api/midjourney-api/upscale
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Upscale one of the 4 generated images by the Imagine command.
   *
   * This is the same as clicking U1, U2, U3, or U4 on Discord.
   */
  async upscale(messageId, jobId, position, callbackURL = undefined) {
    try {
      const data = JSON.stringify({
        messageId,
        jobId,
        position,
        callbackURL,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/upscale`,
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const { data: responseData } = await axios.request(config);

      if (this.verbose) {
        console.log({
          response: responseData,
        });
      }

      return {
        ...responseData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Upscale request failed!');
    }
  }

  /**
   * https://docs.midjourneyapi.io/midjourney-api/midjourney-api/variations
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Create 4 new variations of one of the 4 generated images by the Imagine command.
   *
   * This is the same as clicking V1, V2, V3, or V4 on Discord.
   */
  async variations(messageId, jobId, position, callbackURL = undefined) {
    try {
      const data = JSON.stringify({
        messageId,
        jobId,
        position,
        callbackURL,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/variants`,
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const { data: responseData } = await axios.request(config);

      if (this.verbose) {
        console.log({
          response: responseData,
        });
      }

      return {
        ...responseData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Variations request failed!');
    }
  }

  /**
   * https://docs.midjourneyapi.io/midjourney-api/midjourney-api/upload-image
   *
   * Upload an image and get an image URL back.
   *
   * You can then use these images URLs in your Imagine prompts
   */
  async uploadImage(image) {
    try {
      console.log(image);
      const data = new FormData();
      data.append('image', image.file, image.name);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/upload`,
        headers: {
          Authorization: this.apiKey,
          ...data.getHeaders(),
        },
        data: data,
      };

      const { data: responseData } = await axios.request(config);

      if (this.verbose) {
        console.log({
          response: responseData,
        });
      }

      return {
        ...responseData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('UploadImage request failed!');
    }
  }

  /**
   * https://docs.midjourneyapi.io/midjourney-api/midjourney-api/seed
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Get the seed of a generated image.
   */
  async getSeed(messageId, jobId, callbackURL = undefined) {
    try {
      const data = JSON.stringify({
        messageId,
        jobId,
        callbackURL,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/seed`,
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const { data: responseData } = await axios.request(config);

      if (this.verbose) {
        console.log({
          response: responseData,
        });
      }

      return {
        ...responseData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('GetSeed request failed!');
    }
  }

  /**
   * https://docs.midjourneyapi.io/midjourney-api/midjourney-api/describe
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Writes four example prompts based on an image you upload.
   *
   * This is the same as using the /describe command in Discord.
   *
   */
  async describe(image, callbackURL = undefined) {
    try {
      const data = new FormData();
      data.append('image', image.file, image.name);
      if (callbackURL) data.append('callbackURL', callbackURL);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/describe`,
        headers: {
          Authorization: this.apiKey,
          ...data.getHeaders(),
        },
        data: data,
      };

      const { data: responseData } = await axios.request(config);

      if (this.verbose) {
        console.log({
          response: responseData,
        });
      }

      return {
        ...responseData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Describe request failed!');
    }
  }

  /**
   * https://docs.midjourneyapi.io/midjourney-api/midjourney-api/blend
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Blend multiple images into one image.
   *
   * This is the same as using the /blend command in Discord.
   *
   */
  async blend(images, dimension = 'Landscape', callbackURL = undefined) {
    try {
      const data = new FormData();
      for (let i = 0; i < images.length; i += 1) {
        data.append('image', images[i].file, images[i].name);
      }
      data.append('dimension', dimension);
      if (callbackURL) data.append('callbackURL', callbackURL);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/blend`,
        headers: {
          Authorization: this.apiKey,
          ...data.getHeaders(),
        },
        data: data,
      };

      const { data: responseData } = await axios.request(config);

      if (this.verbose) {
        console.log({
          response: responseData,
        });
      }

      return {
        ...responseData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Describe request failed!');
    }
  }

  /**
   * https://docs.midjourneyapi.io/midjourney-api/midjourney-api/remix-re-roll
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Reroll to create new images from a previous prompt.
   *
   * This is the same as clicking on  on Discord
   *
   */
  async remix(messageId, jobId, callbackURL = undefined) {
    try {
      const data = JSON.stringify({
        messageId,
        jobId,
        callbackURL,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/remix`,
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const { data: responseData } = await axios.request(config);

      if (this.verbose) {
        console.log({
          response: responseData,
        });
      }

      return {
        ...responseData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Remix request failed!');
    }
  }

  /**
   * https://docs.midjourneyapi.io/midjourney-api/midjourney-api/result
   *
   * Get the final result for a submitted job.
   *
   */
  async getResult(resultId) {
    try {
      const data = JSON.stringify({
        resultId,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/result`,
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const { data: responseData } = await axios.request(config);

      if (this.verbose) {
        console.log({
          response: responseData,
        });
      }

      return {
        ...responseData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Remix request failed!');
    }
  }
}

module.exports = MidjourneyAPI;
