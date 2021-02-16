---
page_type: sample
languages:
- javascript
products:
- azure
description: "Azure Cosmos DB is a globally distributed multi-model database. One of the supported APIs is the Cassandra API."
urlFragment: azure-cosmos-db-cassandra-nodejs-getting-started
---

# Developing a Node.js app with Cassandra API using Azure Cosmos DB
Azure Cosmos DB is a globally distributed multi-model database. One of the supported APIs is the Cassandra API. This sample walks you through creation of keyspace, table, inserting and querying the data.


## Running this sample
* Before you can run this sample, you must have the following perquisites:
	* An active Azure Cassandra API account - If you don't have an account, refer to the [Create a Cassandra API account](https://docs.microsoft.com/en-us/azure/cosmos-db/create-cassandra-nodejs) article.
	* [Node.js](https://nodejs.org/en/) version v0.10.29 or higher.
	* [Git](http://git-scm.com/).
  * [Node.js driver for apache cassandra](https://github.com/datastax/nodejs-driver) // to install the driver - run npm install cassandra-driver 


1. Clone this repository:

    ```bash
	git clone git@github.com:Azure-Samples/Azure-Samples/azure-cosmos-db-cassandra-node-getting-started.git cosmosdb
    ```

1. Change directories to the repo:

    ```bash
    cd cosmosdb
    ```

1. Install npm dependencies:

    ```bash
    npm install
    ```

1. Next, substitute the contactPoint, username, password, and Azure region in `config.js` with your Cosmos DB account's values from the Azure portal. Find REGION on the Overview page as Read locations. The remaining settings are on the Settings -> Connection string page. 

    ```javascript
    module.exports = {
        username: 'USERNAME',
        password:
          'PRIMARY-PASSWORD',
        contactPoint: 'CONTACT-POINT',
        keySpace: "uprofile",
        localDataCenter: "REGION"
    };
    ```

1. Run `uprofile.js` in a terminal to start your start your node application:

    ```bash
	npm start
	```

## About the code
The code included in this sample is intended to get you quickly started with a Node.js console application that connects to Azure Cosmos DB with the Cassandra API. 

## More information

- [Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/introduction)
- [Node.js drive Documentation](https://github.com/datastax/nodejs-driver)
