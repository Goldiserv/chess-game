// import AWS from 'aws-sdk';
import { CostExplorerClient, GetCostAndUsageCommand } from '@aws-sdk/client-cost-explorer';

import dotenv from 'dotenv';

async function getCostDataByService(accessKeyId: string, secretAccessKey: string, accountIdFilterArray?: string[]): Promise<void> {
  // Create a Cost Explorer client
  const ce = new CostExplorerClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  // Get the date range for the past month
  const endDate = new Date(); // Current date
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1); // Subtract 1 month

  // Create the AWS Cost Explorer API request parameters
  const command = new GetCostAndUsageCommand({
    TimePeriod: {
      Start: startDate.toISOString().split('T')[0],
      End: endDate.toISOString().split('T')[0],
    },
    Granularity: 'DAILY',
    Metrics: ['UnblendedCost'],
    GroupBy: [{ Type: 'DIMENSION', Key: 'SERVICE' }],
    // Filter: {
    //   And: [
    //     { Dimensions: { Key: 'LINKED_ACCOUNT', Values: accountIdFilterArray} },
    //     { Tags: { Key: 'aws:createdBy', Values: ['user@example.com'] } }, // Example tag filter
    //   ],
    // },
  });

  try {
    // Call the Cost Explorer API
    const response = await ce.send(command);

    // Process the response and extract cost data by service for each day
    if (response.ResultsByTime && response.ResultsByTime.length > 0) {
      response.ResultsByTime.forEach((result) => {
        const date = result.TimePeriod?.Start;
        console.log(`Date: ${date}`);
        if (result.Groups && result.Groups.length > 0) {
          result.Groups.forEach((group) => {
            const service = group.Keys?.[0];
            const cost = group.Metrics?.UnblendedCost?.Amount;
            console.log(`Service: ${service}, Cost: $${cost}`);
          });
        }
      });
    } else {
      console.log('No cost data found for the specified time period.');
    }
  } catch (error) {
    console.error('Error retrieving cost data:', error);
  }
}

// Specify the AWS account ID and API key as command line arguments or constants
const accountIdFilterArray = [""] // process.argv[2]; // Replace with your desired method of obtaining the account ID

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const apiKey = process.env.CE_API || "NoKey";
const apiSecret = process.env.CE_API_SECRET || "NoKey";

// Call the function to retrieve the cost data
getCostDataByService(apiKey, apiSecret, accountIdFilterArray);
