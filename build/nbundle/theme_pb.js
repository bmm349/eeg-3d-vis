System.register("MYAPP",[],(function(){"use strict";return{execute:function(){var e=require("google-protobuf"),t=e,o=Function("return this")();t.exportSymbol("proto.theme.theme",null,o),proto.theme.theme=function(t){e.Message.initialize(this,t,0,-1,null,null)},t.inherits(proto.theme.theme,e.Message),t.DEBUG&&!COMPILED&&(proto.theme.theme.displayName="proto.theme.theme"),e.Message.GENERATE_TO_OBJECT&&(proto.theme.theme.prototype.toObject=function(e){return proto.theme.theme.toObject(e,this)},proto.theme.theme.toObject=function(t,o){var r={colorone:e.Message.getFieldWithDefault(o,1,""),colortwo:e.Message.getFieldWithDefault(o,2,""),colorthree:e.Message.getFieldWithDefault(o,3,""),colorfour:e.Message.getFieldWithDefault(o,4,""),colorfive:e.Message.getFieldWithDefault(o,5,""),colorsix:e.Message.getFieldWithDefault(o,6,""),colorseven:e.Message.getFieldWithDefault(o,7,"")};return t&&(r.$jspbMessageInstance=o),r}),proto.theme.theme.deserializeBinary=function(t){var o=new e.BinaryReader(t),r=new proto.theme.theme;return proto.theme.theme.deserializeBinaryFromReader(r,o)},proto.theme.theme.deserializeBinaryFromReader=function(e,t){for(;t.nextField()&&!t.isEndGroup();){switch(t.getFieldNumber()){case 1:var o=t.readString();e.setColorone(o);break;case 2:o=t.readString();e.setColortwo(o);break;case 3:o=t.readString();e.setColorthree(o);break;case 4:o=t.readString();e.setColorfour(o);break;case 5:o=t.readString();e.setColorfive(o);break;case 6:o=t.readString();e.setColorsix(o);break;case 7:o=t.readString();e.setColorseven(o);break;default:t.skipField()}}return e},proto.theme.theme.prototype.serializeBinary=function(){var t=new e.BinaryWriter;return proto.theme.theme.serializeBinaryToWriter(this,t),t.getResultBuffer()},proto.theme.theme.serializeBinaryToWriter=function(e,t){var o=void 0;(o=e.getColorone()).length>0&&t.writeString(1,o),(o=e.getColortwo()).length>0&&t.writeString(2,o),(o=e.getColorthree()).length>0&&t.writeString(3,o),(o=e.getColorfour()).length>0&&t.writeString(4,o),(o=e.getColorfive()).length>0&&t.writeString(5,o),(o=e.getColorsix()).length>0&&t.writeString(6,o),(o=e.getColorseven()).length>0&&t.writeString(7,o)},proto.theme.theme.prototype.getColorone=function(){return e.Message.getFieldWithDefault(this,1,"")},proto.theme.theme.prototype.setColorone=function(t){e.Message.setProto3StringField(this,1,t)},proto.theme.theme.prototype.getColortwo=function(){return e.Message.getFieldWithDefault(this,2,"")},proto.theme.theme.prototype.setColortwo=function(t){e.Message.setProto3StringField(this,2,t)},proto.theme.theme.prototype.getColorthree=function(){return e.Message.getFieldWithDefault(this,3,"")},proto.theme.theme.prototype.setColorthree=function(t){e.Message.setProto3StringField(this,3,t)},proto.theme.theme.prototype.getColorfour=function(){return e.Message.getFieldWithDefault(this,4,"")},proto.theme.theme.prototype.setColorfour=function(t){e.Message.setProto3StringField(this,4,t)},proto.theme.theme.prototype.getColorfive=function(){return e.Message.getFieldWithDefault(this,5,"")},proto.theme.theme.prototype.setColorfive=function(t){e.Message.setProto3StringField(this,5,t)},proto.theme.theme.prototype.getColorsix=function(){return e.Message.getFieldWithDefault(this,6,"")},proto.theme.theme.prototype.setColorsix=function(t){e.Message.setProto3StringField(this,6,t)},proto.theme.theme.prototype.getColorseven=function(){return e.Message.getFieldWithDefault(this,7,"")},proto.theme.theme.prototype.setColorseven=function(t){e.Message.setProto3StringField(this,7,t)},t.object.extend(exports,proto.theme)}}}));
