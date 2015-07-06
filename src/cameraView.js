
var React = require('react-native');
var styles = require('./styles')
var API = require('./api')

var {
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
  Image
} = React;

var login = t.struct({
  name: t.Str,
  apikey: t.Str
})


var Login = React.createClass({
  getInitialState: function() {
    return {username:""};
  },
  componentDidMount: function(){
    API.authenticate("stuartlynn","cbbc4efb5201efb60996d645f264ef4e7b14495b")
    API.attemptLogin().then((username)=> this.setState({username: username}))
  },
  triggerLogin:function(){
    this.props.navigator.push({
      component: ProjectSelectPage,
      title: "Select a project"
    })
  },
  render: function() {

    return (
      <View style={styles.container}>
        <Image source={require('image!carto_db_logo')} style={{alignSelf:'center',marginBottom:20}}/>
        <Form
          ref="form"
          type={login}
          options={{}}
        />
        <Text>{this.state.username}</Text>
        <TouchableHighlight onPress={this.triggerLogin} style={styles.submit}>
          <Text style={styles.text}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
})

module.exports=Login
