var _ = require('underscore')

/**
 * Returns an object where each key is a tag
 * The value is an array of all of the ids of the articles that
 * are linked together because of the parent tag
 *
 * The array is sorted numerically.
 * @return {Object}
 */
function getTags(){
  return $("article").toArray().reduce(function(memo, post, postId){
    $(post).find("#tags li").each(function(tagI, tag){
      var tagText = tag.textContent;
      if(memo[tagText]){
        var newIdArray = memo[tagText];
        newIdArray.push(postId);

        memo[tagText] = newIdArray.sort(numericSort);
      } else {
        memo[tagText] = [postId];
      }
    })
    return memo;
  }, {});
}

function numericSort(a, b){
  if(a > b){
    return 1; 
  } else if(a < b){
    return -1;
  }

  return 0;
}

/**
 * Returns an array of objects where from and to are keys with ids
 * [{
 *  from: :id,
 *  to: :id
 * }]
 * @param  {Objects} tags 
 * @return {Array}
 */
function getEdges(tags){
  return _.chain(tags)
  .map(function(arrayOfIds, key){
    return arrayOfIds;
  })
  .map(function(arrayOfIds){
    return _.map(arrayOfIds, function(fromId, fromIndex){
      var resultArray = [];
      arrayOfIds.forEach(function(toId, toIndex){
        if(toIndex > fromIndex){
          resultArray.push({from: fromId, to:toId});
        }
      });
      return resultArray;
    })
  })
  .flatten()
  .compact()
  .uniq(false, transform)
  .value();
}

/**
 * This combines the two ids in two and from
 * to get a unique identifier for a pair
 *
 * The idea here is that 1,2 and 2,1 should return the same
 * 
 * @param  {Object} edge Edge description
 * @return {Number}      
 */
function transform(edge){
  var sorted = [edge.to, edge.from].sort(numericSort);

  return pairingFunction(sorted[0],sorted[1])
}

/**
 * Returns a unique number based on a,b
 *
 * a,b is different from b,a
 * 
 * @param  {Number} a 
 * @param  {Number} b 
 * @return {Number}   
 */
function pairingFunction(a, b){
  return Math.pow(2, a)*Math.pow(3, b);
}

module.exports = {
  getTags: getTags,
  getEdges: getEdges
}