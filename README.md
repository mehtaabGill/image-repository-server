# Image Repository (Sever)

## Demo Video (this repository is being used in the backend)

https://user-images.githubusercontent.com/37054853/117561919-0e645880-b058-11eb-8e4c-4cb30f22d138.mp4

## Live Production Version
[View Here](https://imagerepo.app/)

## How to get the app running:
1. Git clone this repsitory and `cd` into the project folder
2. Create a `.env` file in the project's root directory and add the following lines:
    ```
    AWS_ACCESS_KEY_ID=<AWS Acces Key>
    AWS_SECRET_ACCESS_KEY=<AWS Secret Access Key>
    AWS_DEFAULT_REGION=us-west-1 (Optional to leave as-is or change to prefered region)
    DATABASE_URL=<Mongo DB connection URI>
    DISABLE_IMAGE_UPLOAD= (Optional. Set this to "true" to disable image upload or omit this line to leave it enabled)
    ```
3. Run `yarn install` to install the required node modules
4. To start the app, run `yarn start`

## Other commands

### Build for production
```
yarn build
```

### Run tests
```
yarn test
```
