export const handleApiOutput = (req, res) => {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    const returnRequestOptions = (imageURL) => {  
        // Your PAT (Personal Access Token) can be found in the portal under Authentification
          const PAT = '';
          // Specify the correct user_id/app_id pairings
          // Since you're making inferences outside your app's scope
          const USER_ID = '';       
          const APP_ID = '';
          // Change these to whatever model and image URL you want to use
          // const MODEL_ID = 'face-detection';
          // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';   
          const IMAGE_URL = imageURL;
    
        ///////////////////////////////////////////////////////////////////////////////////
        // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
        ///////////////////////////////////////////////////////////////////////////////////
    
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });
    
        const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
        };
        return requestOptions;
    }
    const MODEL_ID = 'face-detection';
    const {imageUrl} = req.body;
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID  + "/outputs", returnRequestOptions(imageUrl))
    .then(response => response.json())
    .then(faceRegionData => {
        console.log(faceRegionData)
        return res.json(faceRegionData)})
        .catch(err => res.status(400).json('unable to work with API'))
        // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
        // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
        // this will default to the latest version_id    
}