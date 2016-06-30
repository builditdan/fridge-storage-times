#Fridge Storage Times - a AWS Lambda function for Alexa
A  [AWS Lambda](http://aws.amazon.com/lambda) function that provides food storage guidelines as outlined by the Foodsafety.gov site. See https://www.foodsafety.gov/keep/charts/storagetimes.html for more details.

## Concepts
Fridge Storage Times is here to provide guidelines how long food items can be safely kept under refrigeration or frozen. The information was sourced from Foodsafety.gov and covers most common meats, fruits, and vegetables.  

So the next time you are wondering about a food item and how long to keep it. Just ask...

"Alexa ask fridge storage times"

"Alexa ask fridge storage times how long can I keep leftovers"

"Alexa ask fridge storage times how long can I keep bok choy"

"Alexa ask fridge storage times how long can I store chicken"

These are just guidelines and common sense should be followed when handling all food items including following the use-by-date provider by the retailer or manufacturer.

Disclaimer:  Refrigeration guidelines were collected from FoodSafety.gov. In no event will I be liable for any food-born illness, death, or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever in connection with, the use of this Amazon Alexa Skill.

## Setup
To run this example skill you need to do two things. The first is to deploy the example code in lambda, and the second is to configure the Alexa skill to use Lambda.

### AWS Lambda Setup
1. Go to the AWS Console and click on the Lambda link. Note: ensure you are in us-east or you won't be able to use Alexa with Lambda.
2. Click on the Create a Lambda Function or Get Started Now button.
3. Skip the blueprint
4. Name the Lambda Function "Fridge-Storage-Times-Example-Skill".
5. Select the runtime as Node.js
6. Go to the the src directory, select all files and then create a zip file, make sure the zip file does not contain the src directory itself, otherwise Lambda function will not work.
7. Select Code entry type as "Upload a .ZIP file" and then upload the .zip file to the Lambda
8. Keep the Handler as index.handler (this refers to the main js file in the zip).
9. Create a basic execution role and click create.
10. Leave the Advanced settings as the defaults.
11. Click "Next" and review the settings then click "Create Function"
12. Click the "Event Sources" tab and select "Add event source"
13. Set the Event Source type as Alexa Skills kit and Enable it now. Click Submit.
14. Copy the ARN from the top right to be used later in the Alexa Skill Setup


### Alexa Skill Setup
1. Go to the [Alexa Console](https://developer.amazon.com/edw/home.html) and click Add a New Skill.
2. Set "FridgeStorageTimesHelper" as the skill name and "fridge storage times" as the invocation name, this is what is used to activate your skill. For example you would say: "Alexa, Ask fridge storage times how long can I keep hotdogs."
3. Select the Lambda ARN for the skill Endpoint and paste the ARN copied from above. Click Next.
4. Copy the custom slot types from the customSlotTypes folder. Each file in the folder represents a new custom slot type. The name of the file is the name of the custom slot type, and the values in the file are the values for the custom slot.
5. Copy the Intent Schema from the included IntentSchema.json.
6. Copy the Sample Utterances from the included SampleUtterances.txt. Click Next.
7. [optional] go back to the skill Information tab and copy the appId. Paste the appId into the index.js file for the variable APP_ID,
   then update the lambda source zip file with this change and upload to lambda again, this step makes sure the lambda function only serves request from authorized source.
8. You are now able to start testing your sample skill! You should be able to go to the [Echo webpage](http://echo.amazon.com/#skills) and see your skill enabled.
9. In order to test it, try to say some of the Sample Utterances from the Examples section below.
10. Your skill is now saved and once you are finished testing you can continue to publish your skill.

## Examples
### One-shot model:
    User: "Alexa, ask fridge storage times how long can I keep bacon."
    Alexa: "(reads back storage times for bacon)"
