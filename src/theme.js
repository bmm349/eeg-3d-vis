/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.theme.theme');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.theme.theme = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.theme.theme, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.theme.theme.displayName = 'proto.theme.theme';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.theme.theme.prototype.toObject = function(opt_includeInstance) {
  return proto.theme.theme.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.theme.theme} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.theme.theme.toObject = function(includeInstance, msg) {
  var f, obj = {
    colorone: jspb.Message.getFieldWithDefault(msg, 1, ""),
    colortwo: jspb.Message.getFieldWithDefault(msg, 2, ""),
    colorthree: jspb.Message.getFieldWithDefault(msg, 3, ""),
    colorfour: jspb.Message.getFieldWithDefault(msg, 4, ""),
    colorfive: jspb.Message.getFieldWithDefault(msg, 5, ""),
    colorsix: jspb.Message.getFieldWithDefault(msg, 6, ""),
    colorseven: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.theme.theme}
 */
proto.theme.theme.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.theme.theme;
  return proto.theme.theme.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.theme.theme} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.theme.theme}
 */
proto.theme.theme.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setColorone(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setColortwo(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setColorthree(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setColorfour(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setColorfive(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setColorsix(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setColorseven(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.theme.theme.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.theme.theme.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.theme.theme} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.theme.theme.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getColorone();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getColortwo();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getColorthree();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getColorfour();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getColorfive();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getColorsix();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getColorseven();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string colorOne = 1;
 * @return {string}
 */
proto.theme.theme.prototype.getColorone = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.theme.theme.prototype.setColorone = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string colorTwo = 2;
 * @return {string}
 */
proto.theme.theme.prototype.getColortwo = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.theme.theme.prototype.setColortwo = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string colorThree = 3;
 * @return {string}
 */
proto.theme.theme.prototype.getColorthree = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.theme.theme.prototype.setColorthree = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string colorFour = 4;
 * @return {string}
 */
proto.theme.theme.prototype.getColorfour = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.theme.theme.prototype.setColorfour = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string colorFive = 5;
 * @return {string}
 */
proto.theme.theme.prototype.getColorfive = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.theme.theme.prototype.setColorfive = function(value) {
  jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string colorSix = 6;
 * @return {string}
 */
proto.theme.theme.prototype.getColorsix = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.theme.theme.prototype.setColorsix = function(value) {
  jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string colorSeven = 7;
 * @return {string}
 */
proto.theme.theme.prototype.getColorseven = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/** @param {string} value */
proto.theme.theme.prototype.setColorseven = function(value) {
  jspb.Message.setProto3StringField(this, 7, value);
};


