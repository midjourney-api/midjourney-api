const axios = require('axios').default;
const FormData = require('form-data');

// Main class declaration
class MidjourneyAPI {
  constructor(apiKey, verbose = false) {
    this.baseURL = 'https://api.midjourneyapi.io/v2/';
    this.apiKey = apiKey;
    this.verbose = verbose;

    if (!apiKey) {
      throw new Error('The apiKey is required!');
    }
  }

  /**
   * https://slashimagine.pro/docs
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Generate an image using a text prompt.
   *
   * This is the /imagine command on Discord.
   */
  async imagine(prompt, mode = 'fast', callbackURL = undefined) {
    try {
      const data = JSON.stringify({
        prompt,
        callbackURL,
        mode,
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
      console.log(error?.response?.data?.errors);
      throw new Error('Imagine request failed!');
    }
  }

  /**
   * https://slashimagine.pro/docs
   *
   * ⚠️ This will produce the direct result so no need to use getResult() method.
   *
   * Upscale one of the 4 generated images by the Imagine command.
   *
   * This is the same as clicking U1, U2, U3, or U4 on Discord.
   */
  async upscale(taskId, position) {
    try {
      const data = JSON.stringify({
        taskId,
        position,
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
      console.log(error?.response?.data?.errors);
      throw new Error('Upscale request failed!');
    }
  }

  /**
   * https://slashimagine.pro/docs
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Create 4 new variations of one of the 4 generated images by the Imagine command.
   *
   * This is the same as clicking V1, V2, V3, or V4 on Discord.
   */
  async variations(taskId, position, callbackURL = undefined) {
    try {
      const data = JSON.stringify({
        taskId,
        position,
        callbackURL,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/variations`,
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
   * https://slashimagine.pro/docs
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
   * https://slashimagine.pro/docs
   *
   * ⚠️ This won't produce the direct result but submit the job to Midjourney. You can use the getResult() method to get the final result later.
   *
   * Get the seed of a generated image.
   */
  async getSeed(taskId, callbackURL = undefined) {
    try {
      const data = JSON.stringify({
        taskId,
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
   * https://slashimagine.pro/docs
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
   * https://slashimagine.pro/docs
   *
   * ⚠️ This will produce the direct result; so you don't need to use the getResult() method to get the final result later.
   *
   * Swap the face on the target image with the face on source image.
   *
   * This is the same as using the /blend command in Discord.
   *
   */
  async faceswap(targetImageURL, faceImageURL) {
    try {
      const data = JSON.stringify({
        targetImageURL,
        faceImageURL,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${this.baseURL}/faceswap`,
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
      throw new Error('Faceswap request failed!');
    }
  }

  /**
   * https://slashimagine.pro/docs
   *
   * Get the final result for a submitted job.
   *
   */
  async getResult(taskId) {
    try {
      const data = JSON.stringify({
        taskId,
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
      throw new Error('Result request failed!');
    }
  }
}

module.exports = MidjourneyAPI;
