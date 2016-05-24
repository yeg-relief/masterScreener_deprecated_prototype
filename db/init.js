const
utils = require('./utils'),
modelIndex = require('./models/index');

module.exports = {
  testConnect,
  initIndex,
  initMasterMapping
};

/*
  test connection
 */
function testConnect(elasticClient) {
  elasticClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: Infinity,
    // undocumented params are appended to the query string
    hello: "elasticsearch!"
  }, function (error) {
    if (error) {
      throw Error('Elasticsearch Client unable to ping cluster on localhost');
    } else {
      console.log('Elasticsearch Client can connect');
    }
  });
  return true;
}


/*
  create index -- if not exists
 */
function initIndex(elasticClient, indexName) {
  utils.indexExists(elasticClient, indexName)
       .then( exists => {
          if (exists) {
            console.log(`${indexName} already exists`);
          } else {
            console.log(`creating index ${indexName}`);
            utils.initIndex(elasticClient, indexName);
          }
        });
}

function initMasterMapping(elasticClient, indexName, typeName) {
  const mapping = modelIndex.generateMasterMapping(modelIndex.gatherScreenerMappings());
  utils.mappingExists(elasticClient, indexName, typeName)
       .then( exists => {
         console.log('**************');
         console.log(exists);
         console.log('**************');
         if (exists) {
           console.log(`${indexName} has ${typeName} already defined`);
           utils.initMapping(elasticClient, indexName, typeName, mapping);
         } else {
           console.log(`defining ${typeName} on ${indexName}`);
           utils.initMapping(elasticClient, indexName, typeName, mapping);
         }
       })
}