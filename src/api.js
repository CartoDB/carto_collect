
class API{

  query(query, account){
    var acc = account ? account : this.username
    var query_str = `https://${acc}.cartodb.com/api/v2/sql?q=${query}&api_key=${this.apikey}`
    console.log("query is ", query_str, query)
    var result = fetch(query_str).then((r) => r.json()).then(this.deSQLify)
    return result
  }
  deSQLify(response ){
    console.log("raw response ", response )
    var rows = response.rows
    return rows.length==1 ? rows[0] : rows
  }
  getUUID() {
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
  authenticate(username,apikey){
    this.username=username
    this.apikey= apikey
  }
  fullPageMapURL(mapID){
    return `https://${this.username}.cartodb.com/viz/${mapID}/embed_map`
  }
  getMapVisJson(mapid){
    console.log("triyng to get json viz for ", mapid)
    var query = `https://${this.username}.cartodb.com/api/v2/viz/${mapid}/viz.json`
    console.log(query)
    return fetch(query).then((r)=>r.json())
  }
  attemptLogin(){
    return this.query("select current_user")
  }
  getTables(){
    var query = `https://team.cartodb.com/u/${this.username}/api/v1/viz/?tag_name=&q=&page=1&type=&exclude_shared=false&per_page=9&tags=&shared=no&locked=false&only_liked=false&order=updated_at&types=derived`
    return fetch(query).then((r)=>r.json()).then((tab) => {
      var mapIds=tab.visualizations.map(function(e){return e.id})
      var p = Promise.all(mapIds.map((id) =>this.getMapVisJson(id)))
//      p.fail((error)=> console.log(error))
      return p
    })
  }
  getSchema(vizJSON){
    var tableName= this.getTableName(vizJSON)
    var query = `select column_name, data_type, character_maximum_length from INFORMATION_SCHEMA.COLUMNS where table_name = '${tableName}';`
    return this.query(query)
  }
  getTableName(vizJSON){
    console.log("visulisation is ", vizJSON)
    var layerGroup = vizJSON.layers.filter((layer)=>layer.type=='layergroup' || layer.type=='torque')[0]
    if(layerGroup.type=='torque'){
      return layerGroup.options.layer_name
    }
    else{
      return layerGroup.options.layer_definition.layers[0].options.layer_name
    }

  }
  staticMap(uuid,lat,lng, zoom, width,height){
    var id = uuid.replace(/\-/g,"_")

    var width  = 200
    var height = 300
    var result = `https://${this.username}.cartodb.com/api/v1/map/static/named/tpl_${id}/${width}/${height}.png`

    return result
  }
}

var api = new API()

module.exports = api
