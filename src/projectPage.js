
var React  = require('react-native');
var styles = require('./styles')
var API    = require('./api')
var t = require('tcomb-form-native');
var Form = t.form.Form;
var RNTAnimation = require("react-native-tween-animation")

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  NavigatorIOS,
  TouchableHighlight,
  WebView,
  ScrollView
} = React;




var ProjectPage = React.createClass({

  getInitialState:function(){
    return {
      mapURL: API.fullPageMapURL(this.props.project.id),
      schema: [],
      mapData: t.struct({}),
      schemaFlex: 0.9,
      mapFlex: 0.02,
      formOptions:{},
      position: {coords: {latitude: 'unknown', longitude: 'unknown'}}
    }
  },

  createAnimation:function(){
    var animateCollapse = new RNTAnimation({

  // Start state
      start: {
        schemaFlex: 0.5,
        mapFlex: 0.4,
      },

      // End state
      end: {
        schemaFlex: 0.89 ,
        mapFlex: 0.01
      },

      // Animation duration
      duration: 2000,

      // Tween function
      tween: 'easeOutBack',

      // Update the component's state each frame
      frame: (tweenFrame) => {
        console.log("map flex ", tweenFrame)
        this.setState(tweenFrame);
      },

      // Optional callback
      done: () => {

        console.log('All done!');

      }
    })
    return animateCollapse
  },
  startAnim:function(){
    var animateCollapse = this.createAnimation()
    animateCollapse.start()
  },
  componentDidMount:function(){
    API.getSchema(this.props.project).then(this.updateSchema.bind(this))
    navigator.geolocation.getCurrentPosition(
     (position) => this.setState({position}),
     (error) => console.log(error.message),
     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
   );
   this.watchID = navigator.geolocation.watchPosition((position) => {
     this.setState({position});
   },
   (error) => console.log(error.message),
   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

  },
  showCameraForField:function(field){
    console.log("showing camera")
  },
  recordElivationFor:function(field){
    console.log('recoring elivation')
  },
  recordOrientationFor: function(field){
    console.log('recoring orientation')
  },
  textFieldTemplate:function(locals){
    var stylesheet = locals.stylesheet;
    var formGroupStyle = stylesheet.formGroup.normal;
    var controlLabelStyle = stylesheet.controlLabel.normal;
    var textboxStyle = stylesheet.textbox.normal;
    var helpBlockStyle = stylesheet.helpBlock.normal;
    var errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      textboxStyle = stylesheet.textbox.error;
      helpBlockStyle = stylesheet.helpBlock.error;
    }

    if (locals.editable === false) {
      textboxStyle = stylesheet.textbox.notEditable;
    }

    var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    var error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;

    return (
      <View style={formGroupStyle}>
        {label}
        <TextInput
          ref="input"
          autoCapitalize={locals.autoCapitalize}
          autoCorrect={locals.autoCorrect}
          autoFocus={locals.autoFocus}
          bufferDelay={locals.bufferDelay}
          clearButtonMode={locals.clearButtonMode}
          editable={locals.editable}
          enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
          keyboardType={locals.keyboardType}
          multiline={locals.multiline}
          onBlur={locals.onBlur}
          onEndEditing={locals.onEndEditing}
          onFocus={locals.onFocus}
          onSubmitEditing={locals.onSubmitEditing}
          password={locals.password}
          placeholderTextColor={locals.placeholderTextColor}
          returnKeyType={locals.returnKeyType}
          selectTextOnFocus={locals.selectTextOnFocus}
          secureTextEntry={locals.secureTextEntry}
          selectionState={locals.selectionState}
          onChangeText={(value) => locals.onChange(value)}
          placeholder={locals.placeholder}
          style={textboxStyle}
          value={locals.value}
        />
        {help}
        {error}
        <TouchableHighlight onPress={()=>this.showCameraForField(this.label)}><Text>Take Image</Text></TouchableHighlight>
      </View>
    );
  },

  numberFieldTemplate:function(locals){

    var stylesheet = locals.stylesheet;
    var formGroupStyle = stylesheet.formGroup.normal;
    var controlLabelStyle = stylesheet.controlLabel.normal;
    var textboxStyle = stylesheet.textbox.normal;
    var helpBlockStyle = stylesheet.helpBlock.normal;
    var errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      textboxStyle = stylesheet.textbox.error;
      helpBlockStyle = stylesheet.helpBlock.error;
    }

    if (locals.editable === false) {
      textboxStyle = stylesheet.textbox.notEditable;
    }

    var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    var error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;

    return (
      <View style={formGroupStyle}>
        {label}
        <TextInput
          ref="input"
          autoCapitalize={locals.autoCapitalize}
          autoCorrect={locals.autoCorrect}
          autoFocus={locals.autoFocus}
          bufferDelay={locals.bufferDelay}
          clearButtonMode={locals.clearButtonMode}
          editable={locals.editable}
          enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
          keyboardType={locals.keyboardType}
          multiline={locals.multiline}
          onBlur={locals.onBlur}
          onEndEditing={locals.onEndEditing}
          onFocus={locals.onFocus}
          onSubmitEditing={locals.onSubmitEditing}
          password={locals.password}
          placeholderTextColor={locals.placeholderTextColor}
          returnKeyType={locals.returnKeyType}
          selectTextOnFocus={locals.selectTextOnFocus}
          secureTextEntry={locals.secureTextEntry}
          selectionState={locals.selectionState}
          onChangeText={(value) => locals.onChange(value)}
          placeholder={locals.placeholder}
          style={textboxStyle}
          value={locals.value}
        />
        {help}
        {error}
        <TouchableHighlight><Text onPress={()=>this.recordOrientationFor(locals.label)}>Record Orientation</Text></TouchableHighlight>
        <TouchableHighlight><Text onPress={()=>this.recordElivationFor(locals.label)}>Record Elivation</Text></TouchableHighlight>
      </View>
    );
  },
  mapToForm:function(data){
    var formStructure = {}
    var fieldsToSkip = ["created_at", "updated_at", "the_geom", "the_geom_webmercator","cartodb_id"]
    var typeMap = { "text": {type: t.maybe(t.Str), template: this.textFieldTemplate } ,
                    "double precision":{type: t.maybe(t.Num), template: this.numberFieldTemplate},
                    "boolean" : {type: t.maybe(t.Bool)}
                  }
    var options = {fields:{}}
    data.forEach((d)=>{
      if(fieldsToSkip.indexOf(d.column_name) == -1){

        var dType = typeMap[d.data_type]
        if(dType){
          formStructure[d.column_name] = dType.type
          if(dType.template){
            options.fields[d.column_name] = {template : dType.template}
          }
        }
      }
    })

    return {structure: formStructure, options: options};
  },

  updateSchema:function(data){
    var mapData = this.mapToForm(data)
    console.log("Map data is ", mapData.options)
    this.setState({
      schema  : data,
      mapData : t.struct(mapData.structure),
      formOptions: mapData.options
    })
  },
  goBack:function(){
    this.props.navigator.pop()
  },
  submitData:function(){
    var value = this.refs.form.getValue()
    value.latitude = this.state.position.latitude
    value.longitude = this.state.position.longitude
    value.recorded_at = (new Date()).
    console.log(value)
  },
  render: function(){

    return(
        <View style={[styles.containerFullWidth, {justifyContent:'flex-start'}]}>
          <WebView
              ref={'webview'}
              automaticallyAdjustContentInsets={true}
              style={[styles.webView, {flex: this.state.mapFlex} ]}
              url={this.state.mapURL}
              javaScriptEnabledAndroid={true}
              startInLoadingState={true}
          />

          <View style={styles.projectInfo}>
            <TouchableHighlight onPress={this.goBack}>
              <Text style={styles.projectInfoText}>Back</Text>

            </TouchableHighlight>
            <Text style={styles.projectInfoText}>{this.props.project.title}</Text>
            <TouchableHighlight onPress={this.startAnim} >
                <Text style={styles.projectInfoText}>collapse</Text>
            </TouchableHighlight>

          </View>
          <View style={[styles.schema, {flex: this.state.schemaFlex}]}>
            <ScrollView>
              <View>
                <Form
                  ref="form"
                  type={this.state.mapData}
                  options={this.state.formOptions}
                />
              </View>

              <View>
                <Text>lat: {this.state.position.coords.latitude}</Text>
                <Text>lon: {this.state.position.coords.longitude}</Text>
              </View>

            </ScrollView>
            <TouchableHighlight onPress={this.submitData} style={styles.submit}>
              <Text style={styles.text}>Submit</Text>
            </TouchableHighlight>

          </View>
        </View>
    )
  }

})

module.exports = ProjectPage
