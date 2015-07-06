
var React  = require('react-native');
var styles = require('./styles')
var API    = require('./api')
ProjectPage = require('./projectPage')


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  NavigatorIOS,
  TouchableHighlight,
  ListView,
  Image
} = React;


var SelectProject = React.createClass({
  getInitialState:function(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
    };
  },
  updateTableList:function(list){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(list)
    })
  },
  componentDidMount:function(){
    API.getTables().then((result) => this.updateTableList(result))
  },
  navigateToProjectPage:function(data){
    this.props.navigator.push({
      title:data.title,
      component: ProjectPage,
      passProps: {
        project: data
      }
    })
  },
  _renderRow:function(data){
    var staticMap = API.staticMap(data.id)
    return(
      <TouchableHighlight onPress={()=>this.navigateToProjectPage(data)}>
        <Image style={styles.projectSelectorRow} source={{uri:staticMap}}>
          <Text>{data.title}</Text>
        </Image>
      </TouchableHighlight>
    )
  },
  render: function(){
    return(
      <View style={styles.containerFullWidth}>
        <Text>Select your project</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderRow(rowData) }
        />
      </View>
    )
  }

})

module.exports = SelectProject
